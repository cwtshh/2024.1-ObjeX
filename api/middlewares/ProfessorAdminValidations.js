const { body } = require('express-validator');

const ProfessorAdminCreateValidation = () => {
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
        body('senha')
            .isString()
            .withMessage("A senha é obrigatória")
            .isLength({ min: 6})
            .withMessage("A senha deve ter no mínimo 6 caracteres")
    ]
};

const ProfessorAdminLoginValidation = () => {
    return [
        body('email')
            .isString()
            .withMessage("O email é obrigatório")
            .isEmail()
            .withMessage("O email deve ser válido"),
        body('senha')
            .isString()
            .withMessage("A senha é obrigatória")
    ]
}

module.exports = {
    ProfessorAdminCreateValidation,
    ProfessorAdminLoginValidation
}