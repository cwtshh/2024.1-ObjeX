const Atividade = require("../../models/Atividade");
const RespostaTexto = require("../../models/RespostaTexto");

const responder_atividade_texto = async(req, res) => {
    const { id_atividade, resposta, id_usuario } = req.body;
    const atividade = await Atividade.findById(id_atividade);
    if (!atividade) {
        return res.status(404).json({ message: "Atividade não encontrada" });
    }
    if (atividade.type !== "text") {
        return res.status(400).json({ message: "Atividade não é de texto" });
    }
    if(atividade.data_abertura > new Date() || atividade.data_encerramento < new Date()){
        return res.status(400).json({message: 'Atividade fechada'});
    }
    const resposta_nova = await RespostaTexto.create({
        resposta,
        atividade: id_atividade,
        usuario: id_usuario,
    });
    if(!resposta_nova) {
        return res.status(500).json({ message: "Erro ao responder atividade" });
    }
    return res.status(201).json(resposta_nova);
};

module.exports = responder_atividade_texto;