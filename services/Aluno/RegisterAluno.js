const Aluno = require('../../models/Aluno');
const bcrypt = require('bcryptjs');
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

const update_aluno = async(req, res) => {
    const { id, nome, matricula, email} = req.body;
    
    const aluno = await Aluno.findById(id);
    if(!aluno) {
        return res.status(400).json({message: 'Aluno não encontrado'});
    }
    aluno.nome = nome;
    aluno.matricula = matricula;

    if(aluno.email == ''){
        await aluno.save();

        return res.status(200).json({
            message: 'Aluno atualizado com sucesso',
        });
    }
    
    aluno.email = email;
    const senha = auto_generate_password();
    aluno.senha = senha;
    await aluno.save();

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(senha, salt);
    const text = `
        <p style="font-size:17px; color: black">Olá, ${aluno.nome}!</p>
        <p style="font-size:16px; color: black">Sua conta foi atualizada no sistema ObjeX. Seguem seus novos dados de login:</p>
        <p style="font-size:16px; color: black"><strong>Matrícula:</strong> ${matricula}</p>
        <p style="font-size:16px; color: black"><strong>Senha:</strong> ${senha}</p>
        <p style="font-size:16px; color: black"Digite sua senha na aba de "Primeiro Acesso" para concluir a atualização do seu cadastro.</p>
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
    } catch(error){
        return res.status(500).json({
            error_message: 'Erro ao atualizar Aluno - Falha ao enviar email: ', error
        });
    }

    return res.status(200).json({
        message: 'Aluno atualizado e email enviado com sucesso',
        mail_message
    });
}

const get_senha = async(req, res) => {
    const { matricula } = req.body;
    const aluno = await Aluno.findOne({ matricula });

    if(!aluno) {
        return res.status(400).json({message: 'Aluno não encontrado'});
    }

    if(aluno.email == '') {
        return res.status(400).json({message: 'Aluno não possui email cadastrado'});
    }

    const senha = auto_generate_password();
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(senha, salt);

    const text = `
        <p style="font-size:17px; color: black">Olá, ${aluno.nome}!</p>
        <p style="font-size:16px; color: black">Sua senha foi redefinida no sistema ObjeX. Segue sua nova senha:</p>
        <p style="font-size:16px; color: black"><strong>Senha:</strong> ${senha}</p>
        <p style="font-size:16px; color: black">Atenciosamente,</p>
        <p style="font-size:16px; color: black">Equipe ObjeX.</p>
    `;

    let mail_message = "";
    const subject = 'ObjeX - Redefinição de Senha'
    try {
        await send_mail(aluno.email, subject, text);
        mail_message = `Email enviado com sucesso para: ${aluno.email}`;
        await aluno.updateOne(
            {$set: { senha: hash }},
            { new: true }
        );
    } catch(error){
        return res.status(500).json({message: 'Falha ao enviar email'});
    }

    aluno.senha = hash;
    await aluno.save();

    return res.status(200).json({
        message: 'Senha redefinida e email enviado com sucesso',
        mail_message
    });
}



module.exports = { register_aluno, update_aluno, get_senha };