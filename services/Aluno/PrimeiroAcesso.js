const Aluno = require("../../models/Aluno");
const bcrypt = require('bcryptjs');
const send_mail = require('../../middlewares/SendMail');
const auto_generate_password = require("../../middlewares/PasswordGenerator");

const primeiro_acesso = async(req, res) => {
    const { matricula, email } = req.body;
    const aluno = await Aluno.findOne({ matricula});
    if(!aluno) {
        return res.status(404).json({message: 'Aluno não encontrado'});
    }
    const senha = auto_generate_password();
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(senha, salt);
    const text = `
        <p style="font-size:17px; color: black">Olá, ${aluno.nome}!</p>
        <p style="font-size:16px; color: black">Você foi cadastrado no sistema ObjeX. Seguem seus dados de login:</p>
        <p style="font-size:16px; color: black"><strong>Matrícula:</strong> ${matricula}</p>
        <p style="font-size:16px; color: black"><strong>Senha:</strong> ${senha}</p>
        <p style="font-size:16px; color: black"Digite sua senha na aba de "Primeiro Acesso" para concluir seu cadastro.</p>
        <p style="font-size:16px; color: black">Atenciosamente,</p>
        <p style="font-size:16px; color: black">Equipe ObjeX.</p>
    `;
    let mail_message = "";
    const subject = 'ObjeX - Cadastro Automático'
    try {
        await send_mail(email, subject, text);
        mail_message = `Email enviado com sucesso para: ${email}`;
        await aluno.updateOne(
            {$set: { senha: hash, email: email }},
            { new: true }
        );
        console.log('Aluno atualizado com sucesso');
    } catch(error){
        return res.status(500).json({
            error_message: 'Erro ao cadastrar Aluno - Falha ao enviar email: ', error
        });
    }

    return res.status(200).json({
        message: 'Email enviado com sucesso',
        mail_message
    });
}

module.exports = primeiro_acesso;