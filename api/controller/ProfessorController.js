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
    const { nome, email, senha } = req.body;
    console.log(req.body);
};





module.exports = {
    authenticate_token,
    register_prof_admin
}

