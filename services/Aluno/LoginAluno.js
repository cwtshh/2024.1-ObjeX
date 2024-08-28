const Aluno = require("../../models/Aluno");
const bcrypt = require('bcryptjs');
const generate_token = require('./GenerateToken');

const login_aluno = async(req, res) => {
    const { matricula, senha } = req.body;
    const aluno = await Aluno.findOne({ matricula });
    if(!aluno) {
        return res.status(404).json({message: 'Aluno não encontrado'});
    }
    if(!aluno.active) {
        return res.status(401).json({message: 'Faça o primeiro acesso da conta antes de logar'});
    }
    const pass = await bcrypt.compare(senha, aluno.senha);
    if(!pass) {
        return res.status(401).json({message: 'Senha incorreta'});
    }
    return res.status(200).json({
        message: 'Aluno logado com sucesso',
        token: generate_token(aluno._id),
        user: {
            nome: aluno.nome,
            email: aluno.email,
            matricula: aluno.matricula,
            id: aluno._id,
            turma: aluno.turma,
            in_grupo: aluno.in_grupo,
            role: 'aluno'
        }
    });
};

module.exports = login_aluno;
