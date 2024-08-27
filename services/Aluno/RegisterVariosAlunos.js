const Aluno = require("../../models/Aluno");

const registrar_varios_alunos = async (req, res) => {
    const { alunos, turma } = req.body;
    if(!alunos || !turma) {
        return res.status(400).json({message: 'Campos obrigatórios não preenchidos'});
    }
    try {
        alunos.forEach(async(aluno) => {
            const { nome, matricula } = aluno;
            if(await Aluno.findOne({ matricula })) {
                return res.status(400).json({message: 'Aluno já cadastrado'});
            }
            const new_aluno = await Aluno.create({
                nome,
                matricula,
                turma
            });
            if(!new_aluno) {
                return res.status(400).json({message: 'Erro ao cadastrar aluno'});
            }
        });
    } catch(err) {
        res.status(400).json({message: 'Erro ao cadastrar alunos'});
    }
    return res.status(201).json({
        message: 'Alunos cadastrados com sucesso'
    });
};

module.exports = registrar_varios_alunos;