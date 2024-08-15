const Professor = require("../../models/Professor");
const bcrypt = require("bcryptjs");
const auto_generate_password = require("../../middlewares/PasswordGenerator");
const generate_token = require("./GenerateToken");
const send_mail = require("../../middlewares/SendMail");

const register_prof = async(req, res) => {
    // recebe os dados da requisiçao
    const { nome, email, id_turma } = req.body;

    // verifica se o email já está cadastrado
    if(await Professor.findOne({ email })) return res.status(400).json({
        error: 'Email já cadastrado'
    });

    // gera uma senha
    const senha = auto_generate_password();
    
    // define o assunto do email automático
    const subject = 'ObjeX - Cadastro Automático'

    // define o texto do email
    const text = `
        <p style="font-size:17px; color: black">Olá, ${nome}!</p>
        <p style="font-size:16px; color: black">Você foi cadastrado no sistema ObjeX. Seguem seus dados de login:</p>
        <p style="font-size:16px; color: black"><strong>Email:</strong> ${email}</p>
        <p style="font-size:16px; color: black"><strong>Senha:</strong> ${senha}</p>
        <p style="font-size:16px; color: black">Recomendamos que você altere sua senha após o primeiro login.</p>
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
            error_message: 'Erro ao cadastrar professor - Falha ao enviar email: ', error
        });
    }

    // criptografa a senha
    const hash = await bcrypt.genSalt();
    const pass_hash = await bcrypt.hash(senha, hash);
    
    // cria um novo professor
    const new_prof = await Professor.create({
        nome,
        email,
        senha: pass_hash,
        turma: id_turma,
        role: 'professor'
    });

    // verifica se o professor foi cadastrado
    if(!new_prof) return res.status(500).json({
        error: 'Erro ao cadastrar professor'
    });

    // gera um token para o professor
    const token = generate_token(new_prof._id);

    // retorna o token e os dados do professor
    return res.status(201).json({
        mail_message,
        token,
        user: {
            id: new_prof._id,
            nome: new_prof.nome,
            email: new_prof.email,
            turma: new_prof.turma,
            role: new_prof.role
        },
    });
}; 

module.exports = register_prof;