const { body } = require('express-validator');

const TurmaValidation = () => {
    return [
        body('nome')
            .isString()
            .withMessage("O nome é obrigatório")
            .isLength({ min: 3})
            .withMessage("O nome deve ter no mínimo 3 caracteres"),
        body('horario')
            .isString()
            .withMessage("O horario é obrigatório"),
        body('professor')
            .isString()
            .withMessage("O professor é obrigatorio"),
    ]
};


module.exports = {
    TurmaValidation
}

