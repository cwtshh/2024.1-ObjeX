const Atividade = require("../../models/Atividade");

const editar_atividade = async(req, res) => {
    const { id, nome, enunciado } = req.body;
    const atividade = await Atividade.findById(id);
    if(!atividade){
        return res.status(404).json({
            message: 'Atividade não encontrada'
        });
    }
    atividade.nome = nome;
    atividade.enunciado = enunciado;
    await atividade.save();
    return res.status(200).json({
        message: 'Atividade atualizada com sucesso',
        data: atividade
    });
}

module.exports = editar_atividade;