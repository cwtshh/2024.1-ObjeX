const Aluno = require("../../models/Aluno");
const bcrypt = require('bcryptjs');
const send_mail = require('../../middlewares/SendMail');

const activate_register = async(req, res) => {
    const { matricula, nova_senha, senha_antiga } = req.body;
    const aluno = await Aluno.findOne({matricula});
    console.log(aluno.email);
    if(!aluno) {
        return res.status(404).json({message: 'Aluno não encontrado'});
    }
    if(!await bcrypt.compare(senha_antiga, aluno.senha)) {
        return res.status(400).json({message: 'Senha de acesso incorreta.'});
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(nova_senha, salt);
    await aluno.updateOne(
        {$set: { senha: hash, active: true }},
        { new: true }
    ).then(async(result) => {
        const subject = 'ObjeX - Cadastro Automático'
        // define o texto do email
        const text = `
            <p style="font-size:17px; color: black">Olá, ${aluno.nome}!</p>
            <p style="font-size:16px; color: black">Sua conta foi ativada!</p>
            <p style="font-size:16px; color: black">Seja bem vindo!.</p>
            <p style="font-size:16px; color: black">Atenciosamente,</p>
            <p style="font-size:16px; color: black">Equipe ObjeX.</p>
        `;
        console.log(aluno.email);
        await send_mail(aluno.email, subject, text);
        return res.status(200).json({
            message: 'Senha atualizada com sucesso',
            data: result
        });
    }).catch(error => {
        return res.status(500).json({
            message: 'Erro ao atualizar senha',
            erro: error
        });
    })
};

module.exports = activate_register;