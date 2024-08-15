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

const ProfessorDeleteValidation = () => {
    return [
        body('id')
            .isString()
            .withMessage("O ID é obrigatório")
            .isLength({ min: 24})
            .withMessage("O ID deve ter no mínimo 24 caracteres"),
    ]
};

module.exports = {
    ProfessorCreateValidation,
    ProfessorDeleteValidation
};