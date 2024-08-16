const Aluno = require("../../models/Aluno");
const authenticate_token = require('./AuntheticateToken');
const jwt = require('jsonwebtoken');
const aluno_secret = process.env.aluno_secret;

const login_token = async(req, res) => {
    const { matricula, token } = req.body;
    const aluno = await Aluno.findOne({ matricula });
    if(!aluno) {
        return res.status(404).json({message: 'Aluno não encontrado'});
    }
    if(!aluno.active) {
        return res.status(401).json({message: 'Faça o primeiro acesso da conta antes de logar'});
    }
    const verify_token = jwt.verify(token, aluno_secret, (err) => {
        if(err) {
            return false;
        };
    });
    if(!verify_token) {
        return res.status(401).json({message: 'Token inválido'});
    }
    return res.status(200).json({
        message: 'Aluno logado com sucesso',
        user: {
            nome: aluno.nome,
            email: aluno.email,
            matricula: aluno.matricula,
            id: aluno._id,
            in_grupo: aluno.in_grupo,
            role: 'aluno'
        }
    });
};

module.exports = login_token;