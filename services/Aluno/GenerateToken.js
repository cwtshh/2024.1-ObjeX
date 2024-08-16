const jwt = require('jsonwebtoken');
const secret = process.env.aluno_secret;

const generate_token = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: '7d',
    });
};


module.exports = generate_token;