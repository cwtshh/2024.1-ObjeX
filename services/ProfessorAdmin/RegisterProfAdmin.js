const Professor = require("../../models/Professor");
const Turma = require("../../models/Turma");
const bcrypt = require("bcryptjs");
const  generate_token = require("./GenerateToken");

const register_prof_admin = async(req, res) => {
    // recebe os dados da requisiçao
    const { nome, email, senha } = req.body;

    // verifica se o email já está cadastrado
    if(await Professor.findOne({ email })) return res.status(400).json({
        error: 'Email já cadastrado'
    });
    
    // criptografa a senha
    const hash = await bcrypt.genSalt();
    const pass_hash = await bcrypt.hash(senha, hash);

    // Criar turma placeholder para admin 
    const new_turma = await Turma.create({
        nome: `Turma Adm ${nome}`,
        horario: '0',
    });

    // verifica se a turma foi cadastrada
    if(!new_turma) return res.status(500).json({
        error: 'Erro ao cadastrar turma placeholder do admin'
    });
    
    // cria um novo professor
    const new_prof = await Professor.create({
        nome,
        email,
        senha: pass_hash,
        role: 'admin',
        turma: new_turma._id
    });

    // verifica se o professor foi cadastrado
    if(!new_prof) return res.status(500).json({
        error: 'Erro ao cadastrar professor'
    });

    new_turma.professor = new_prof._id;
    await new_turma.save();

    // gera um token para o professor
    const token = generate_token(new_prof._id);

    // retorna o token e os dados do professor
    return res.status(201).json({
        token,
        user: {
            id: new_prof._id,
            nome: new_prof.nome,
            email: new_prof.email,
            role: new_prof.role,
            turma: new_turma._id
        }
    });
};

module.exports = register_prof_admin;