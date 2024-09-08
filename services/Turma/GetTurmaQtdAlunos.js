const Turma = require('../../models/Turma');
const Aluno = require('../../models/Aluno');

const get_qtd_alunos = async(req, res) => {
    const { id } = req.params;
    const turma = await Turma.findById(id);
    if (!turma) {
        return res.status(404).json({
            message: 'Turma não encontrada'
        });
    }
    const qtd_alunos = await Aluno.find({ turma: id }).countDocuments();
    return res.status(200).json({
        qtd_alunos: qtd_alunos
    });
}

module.exports = get_qtd_alunos;