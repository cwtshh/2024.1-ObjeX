const Professor = require("../../models/Professor");
const bcrypt = require("bcryptjs");
const  generate_token  = require("./GenerateToken");

const login_prof_admin = async(req, res) => {
    // recebe os dados da requisiçao
    const { email, senha } = req.body;
    // verifica se o email está cadastrado
    const prof = await Professor.findOne({ email });
    if(!prof) return res.status(400).json({
        error: 'Email não cadastrado'
    });

    // verifica se a senha está correta
    const pass = await bcrypt.compare(senha, prof.senha);
    if(!pass) return res.status(401).json({
        error: 'Senha inválida'
    });

    // gera um token para o professor
    const token = generate_token(prof._id);

    // retorna o token e os dados do professor
    return res.status(200).json({
        token,
        user: {
            id: prof._id,
            nome: prof.nome,
            email: prof.email,
            role: prof.role
        }
    });
}

module.exports = login_prof_admin;