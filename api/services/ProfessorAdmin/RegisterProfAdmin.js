const Professor = require("../../models/Professor");
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
    
    // cria um novo professor
    const new_prof = await Professor.create({
        nome,
        email,
        senha: pass_hash,
        role: 'admin'
    });

    // verifica se o professor foi cadastrado
    if(!new_prof) return res.status(500).json({
        error: 'Erro ao cadastrar professor'
    });

    // gera um token para o professor
    const token = generate_token(new_prof._id);

    // retorna o token e os dados do professor
    return res.status(201).json({
        token,
        user: {
            id: new_prof._id,
            nome: new_prof.nome,
            email: new_prof.email,
            role: new_prof.role
        }
    });
};

module.exports = register_prof_admin;