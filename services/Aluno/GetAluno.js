const Aluno = require("../../models/Aluno")

const get_alunos = async(req, res) => {
    const alunos = await Aluno.find().select('nome email matricula turma');
    if(alunos.length === 0){
        return res.status(404).json({message: 'Não há alunos cadastrados'});
    }
    return res.status(200).json(alunos);
};


module.exports = get_alunos;