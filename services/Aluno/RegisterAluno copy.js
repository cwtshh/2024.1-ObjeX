const Aluno = require('../../models/Aluno');
const brypt = require('bcryptjs');
const send_mail = require("../../middlewares/SendMail");
const auto_generate_password = require("../../middlewares/PasswordGenerator");

const register_aluno = async(req, res) => {
    const { nome, email, matricula, turma} = req.body;
    if(await Aluno.findOne({ matricula })) {
        return res.status(400).json({message: 'Email já cadastrado'});
    }
    const senha = auto_generate_password();
    const subject = 'ObjeX - Cadastro Automático'
    // define o texto do email
    const text = `
        <p style="font-size:17px; color: black">Olá, ${nome}!</p>
        <p style="font-size:16px; color: black">Você foi cadastrado no sistema ObjeX. Seguem seus dados de login:</p>
        <p style="font-size:16px; color: black"><strong>Matrícula:</strong> ${matricula}</p>
        <p style="font-size:16px; color: black"><strong>Senha:</strong> ${senha}</p>
        <p style="font-size:16px; color: black"Entra na aba de "Primeiro Acesso" para concluir seu cadastro.</p>
        <p style="font-size:16px; color: black">Atenciosamente,</p>
        <p style="font-size:16px; color: black">Equipe ObjeX.</p>
    `
    let mail_message = ""
    // tenta enviar o email
    try {
        await send_mail(email, subject, text);
        mail_message = `Email enviado com sucesso para: ${email}`;
    } catch(error){
        return res.status(500).json({
            error_message: 'Erro ao cadastrar Aluno - Falha ao enviar email: ', error
        });
    }
    const salt = await brypt.genSalt();
    const hash = await brypt.hash(senha, salt);
    const new_aluno = await Aluno.create({
        nome,
        email,
        matricula,
        senha: hash,
        turma
    });
    if(!new_aluno) {
        return res.status(400).json({message: 'Erro ao cadastrar aluno'});
    }

    return res.status(201).json({
        message: 'Aluno cadastrado com sucesso',
        mail_message
    });
}

module.exports = register_aluno;