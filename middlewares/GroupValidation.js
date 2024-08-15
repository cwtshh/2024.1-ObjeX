const { body } = require('express-validator');

const GroupCreateValidation = () => {
    return [
        body('nome')
            .isString()
            .withMessage("O nome é obrigatório")
            .isLength({ min: 3})
            .withMessage("O nome deve ter no mínimo 3 caracteres"),
        body('descricao')
            .isString()
            .withMessage("A descrição é obrigatória")
            .isLength({ min: 3})
            .withMessage("A descrição deve ter no mínimo 3 caracteres"),
        body('turma')
            .isString()
            .withMessage("A turma é obrigatória"),
        body('capacidade')
            .isNumeric()
            .withMessage("A capacidade é obrigatória")
    ]
};

module.exports = {
    GroupCreateValidation
}