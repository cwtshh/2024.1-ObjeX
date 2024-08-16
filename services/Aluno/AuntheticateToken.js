const jwt = require("jsonwebtoken");
const secret = process.env.aluno_secret;

const authenticate_token_aluno = (req, res, next) => {
    const auth_header = req.headers.authorization;
    const token = auth_header && auth_header.split(' ')[1];
    if(!token) return res.status(401).send({ error: 'Token não fornecido' });
    jwt.verify(token, secret, (err, user) => {
        if(err) return res.status(403).send({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};

module.exports = authenticate_token_aluno;