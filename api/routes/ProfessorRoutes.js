const express = require('express');
const router = express();

// controllers
const {
    authenticate_token,
    register_prof_admin,
    login_prof_admin
} = require('../controller/ProfessorController');

// middlewares
const {
    ProfessorAdminCreateValidation,
    ProfessorAdminLoginValidation
} = require('../middlewares/ProfessorAdminValidations');

const validate = require('../middlewares/HandleValidation');

router.get('/', (req, res) => {
    res.send('Rota de professores');
});
router.post('/register/tmp', ProfessorAdminCreateValidation(), validate, register_prof_admin);
router.post('/admin/login', ProfessorAdminLoginValidation(), validate, login_prof_admin);



module.exports = router;