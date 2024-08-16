const { body } = require('express-validator');

const AlunoCreateValidation = () => {
    return [
        body('nome')
            .isString()
            .withMessage("O nome é obrigatório")
            .isLength({ min: 3})
            .withMessage("O nome deve ter no mínimo 3 caracteres"),
        body('email')
            .isEmail()
            .withMessage("O email é obrigatório"),
        body('matricula')
            .isString()
            .withMessage("A matricula é obrigatória")
            .isLength({ min: 9})
            .withMessage("A matricula deve ter no mínimo 3 caracteres"),
        body('turma')
            .isString()
            .withMessage("A turma é obrigatória")
    ]
};

const AlunoActivateValidation = () => {
    return [
        body("nova_senha")
            .isString()
            .withMessage("A nova senha é obrigatória")
            .isLength({ min: 6 })
            .withMessage("A senha deve ter no mínimo 6 caracteres"),
        body("senha_antiga")
            .isString()
            .withMessage("A senha antiga é obrigatória")
    ]
};

const AlunoLoginValidation = () => {
    return [
        body("matricula")
            .isString()
            .withMessage("A matricula é obrigatória"),
        body("senha")
            .isString()
            .withMessage("A senha é obrigatória")
    ]
}

module.exports = {
    AlunoCreateValidation,
    AlunoActivateValidation,
    AlunoLoginValidation
}