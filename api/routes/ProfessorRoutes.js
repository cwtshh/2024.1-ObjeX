const express = require('express');
const router = express();

// services
const authenticate_token = require("../services/ProfessorAdmin/AunthenticateToken");
const register_prof_admin  = require("../services/ProfessorAdmin/RegisterProfAdmin");
const login_prof_admin  = require("../services/ProfessorAdmin/LoginProfAdmin");

const register_prof = require('../services/Professor/RegisterProf');
const login_prof = require('../services/Professor/LoginProf')
const delete_prof = require('../services/Professor/DeleteProf');

// middlewares
const {
    ProfessorAdminCreateValidation,
    ProfessorAdminLoginValidation
} = require('../middlewares/ProfessorAdminValidations');
const {
    ProfessorCreateValidation,
    ProfessorDeleteValidation
} = require('../middlewares/ProfessorValidations');
const validate = require('../middlewares/HandleValidation');

// routes
router.get('/', (req, res) => {
    res.send('Rota de professores');
});

router.post('/register/tmp', ProfessorAdminCreateValidation(), validate, register_prof_admin);
router.post('/admin/login', ProfessorAdminLoginValidation(), validate, login_prof_admin);

router.post('/register', authenticate_token, ProfessorCreateValidation(), validate, register_prof);
router.post('/login', ProfessorAdminLoginValidation(), validate, login_prof);
router.post('/delete', authenticate_token, ProfessorDeleteValidation(), validate, delete_prof);

module.exports = router;