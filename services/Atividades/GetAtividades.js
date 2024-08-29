const Atividade = require("../../models/Atividade");

const get_atividade = async(req, res) => {
    // retorna todos as atividades do banco
    await Atividade.find()
    .select('_id nome enunciado turma professor type createdAt updatedAt data_abertura data_encerramento')
    .populate({
        path: 'turma',
        select: 'nome'
    })
    .then(result => {
        if(result && result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({
                message: 'Não há atividades cadastradas'
            });
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: 'Erro ao encontrar atividades',
            erro: error
        });
    });
}

// retorna todos as atividades de uma turma
const get_atividades_turma = async(req, res) => {
    const { id_turma } = req.params;

    await Atividade.find({ turma: id_turma })
    .select('_id nome enunciado turma professor type createdAt updatedAt data_abertura data_encerramento')
    .populate({
        path: 'turma',
        select: 'nome'
    })
    .then(result => {
        if(result && result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({
                message: 'Não há atividades cadastradas'
            });
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: 'Erro ao encontrar atividades',
            erro: error
        });
    });
}

module.exports = {
    get_atividade,
    get_atividades_turma
}