const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    // verifica se foram encontrados erros de validação
    const errors = validationResult(req);

    // se nao houver erros, continua a requisicao
    if(errors.isEmpty()) return next();

    // caso haja erros, retorna um json com todos os erros
    const extracted_errors = [];
    errors.array().map(err => extracted_errors.push(err.msg));
    return res.status(422).json({
        errors: extracted_errors,
    });
};

module.exports = validate;