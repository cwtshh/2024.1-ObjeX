const Aluno = require("../../models/Aluno");

const get_alunos = async (req, res) => {
    try {
        const alunos = await Aluno.find().select('nome email matricula turma');

        if (alunos.length > 0) {
            return res.status(200).json(alunos);
        } else {
            return res.status(200).json([]);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = get_alunos;
