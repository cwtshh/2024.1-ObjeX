const Atividade = require("../../models/Atividade");

const create_atividade_texto = async(req, res) => {
    const { nome, enunciado, turma, professor, data_abertura, data_encerramento } = req.body;
    const new_atividade = await Atividade.create({ nome, enunciado, turma, professor, type: 'text', data_abertura, data_encerramento });
    if (!new_atividade) {
        return res.status(400).json({ message: 'Erro ao criar a atividade' });
    }
    return res.status(201).json(new_atividade);
};

module.exports = create_atividade_texto;