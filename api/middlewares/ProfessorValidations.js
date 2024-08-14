const { body } = require('express-validator');

const ProfessorCreateValidation = () => {
    return [
        body('nome')
            .isString()
            .withMessage("O nome é obrigatório")
            .isLength({ min: 3})
            .withMessage("O nome deve ter no mínimo 3 caracteres"),
        body('email')
            .isString()
            .withMessage("O email é obrigatório")
            .isEmail()
            .withMessage("O email deve ser válido"),
    ]
};

module.exports = ProfessorCreateValidation;