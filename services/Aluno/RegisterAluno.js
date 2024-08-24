const Aluno = require('../../models/Aluno');
const brypt = require('bcryptjs');
const send_mail = require("../../middlewares/SendMail");
const auto_generate_password = require("../../middlewares/PasswordGenerator");

const register_aluno = async(req, res) => {
    const { nome, matricula, turma} = req.body;
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
    return res.status(201).json({
        message: 'Aluno cadastrado com sucesso'
    });
}

module.exports = register_aluno;