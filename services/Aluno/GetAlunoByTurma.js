const Aluno = require("../../models/Aluno");

const get_aluno_by_turma = async(req, res) => {
    const turma_id = req.query;
    const alunos = await Aluno.find({turma: turma_id}).select('nome email matricula turma');
    return res.status(200).json(alunos);
}

module.exports = get_aluno_by_turma;