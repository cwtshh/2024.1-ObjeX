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
        body('id_turma')
            .isString() // TODO existe um isObectId ?
            .withMessage("O ID da turma é obrigatório")
            .isLength({ min: 24})
            .withMessage("O ID da turma deve ter no mínimo 24 caracteres"),
    ]
};

const ProfessorDeleteValidation = () => {
    return [
        body('id')
            .isString()
            .withMessage("O ID do usuário é obrigatório")
            .isLength({ min: 24})
            .withMessage("O ID do usuário deve ter no mínimo 24 caracteres"),
        body('id_delete')
            .isString()
            .withMessage("O ID do usuário a ser deletado é obrigatório")
            .isLength({ min: 24})
            .withMessage("O ID do usuário a ser deletado deve ter no mínimo 24 caracteres"),
    ]
};

const ProfessorFindValidation = () => {
    return [
        body('id')
            .isString()
            .withMessage("O ID a ser procurado é obrigatório")
            .isLength({ min: 24})
            .withMessage("O ID a ser procurado deve ter no mínimo 24 caracteres"),
    ]
};

const ProfessorUpdatePassValidation = () => {
    return [
        body('id')
            .isString()
            .withMessage("O ID é obrigatório")
            .isLength({ min: 24})
            .withMessage("O ID deve ter no mínimo 24 caracteres"),
        body('old_pass')
            .isString()
            .withMessage("A senha antiga é obrigatória")
            .isLength({ min: 8})
            .withMessage("A senha antiga deve ter no mínimo 8 caracteres"),
        body('new_pass')
            .isString()
            .withMessage("A nova senha é obrigatória")
            .isLength({ min: 8})
            .withMessage("A nova senha deve ter no mínimo 8 caracteres")
    ]
};

const ProfessorUpdateValidation = () => {
    return [
        body('id')
            .isString()
            .withMessage("O ID é obrigatório")
            .isLength({ min: 24})
            .withMessage("O ID deve ter no mínimo 24 caracteres"),
        body('nome')
            .isString()
            .withMessage("O nome é obrigatório")
            .isLength({ min: 3})
            .withMessage("O nome deve ter no mínimo 3 caracteres"),
        body('id_turma')
            .isString() // TODO existe um isObectId ?
            .withMessage("O ID da turma é obrigatório")
            .isLength({ min: 24})
            .withMessage("O ID da turma deve ter no mínimo 24 caracteres"),
        body('role')
            .isIn(['professor', 'admin'])
            .withMessage("O cargo deve ser 'professor' ou 'admin'")
    ]
};

module.exports = {
    ProfessorCreateValidation,
    ProfessorDeleteValidation,
    ProfessorFindValidation,
    ProfessorUpdateValidation,
    ProfessorUpdatePassValidation
};