const RespostaTexto = require("../../models/RespostaTexto");

const get_resposta_por_atividade_texto = async(req, res) => {
    const { id_atividade } = req.params;
    const resposta = await RespostaTexto.find({ atividade: id_atividade }).populate({
        path: "aluno_id",
        select: "nome",
    });
    if (!resposta) {
        return res.status(404).json({ message: "Não há respostas para esta atividade" });
    }
    return res.status(200).json(resposta);
};

module.exports = get_resposta_por_atividade_texto;