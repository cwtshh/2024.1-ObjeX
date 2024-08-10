const Professor = require("../models/Professor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.prof_secret;

const generate_token = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: '7d',
    });
};

const authenticate_token = (req, res, next) => {
    const auth_header = req.headers.authorization;
    const token = auth_header && auth_header.split(' ')[1];
    if(!token) return res.status(401).send({ error: 'Token não fornecido' });
    jwt.verify(token, secret, (err, user) => {
        if(err) return res.status(403).send({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};

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





module.exports = {
    authenticate_token,
    register_prof_admin,
    login_prof_admin
}

