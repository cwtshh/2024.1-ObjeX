const express = require('express');
const router = express();

// services
const authenticate_token = require("../services/ProfessorAdmin/AunthenticateToken");
const authenticate_token_prof = require("../services/Professor/AuthenticateTokenProf");
const register_prof_admin  = require("../services/ProfessorAdmin/RegisterProfAdmin");
const login_prof_admin  = require("../services/ProfessorAdmin/LoginProfAdmin");

const register_prof = require('../services/Professor/RegisterProf');
const login_prof = require('../services/Professor/LoginProf')
const delete_prof = require('../services/Professor/DeleteProf');
const { update_prof_pass, update_prof } = require('../services/Professor/UpdateProf');
const { get_prof, get_profs } = require('../services/Professor/GetProf');

// middlewares
const validate = require('../middlewares/HandleValidation');

const {
    ProfessorAdminCreateValidation,
    ProfessorAdminLoginValidation
} = require('../middlewares/ProfessorAdminValidations');

const {
    ProfessorCreateValidation,
    ProfessorDeleteValidation,
    ProfessorFindValidation,
    ProfessorUpdateValidation,
    ProfessorUpdatePassValidation
} = require('../middlewares/ProfessorValidations');

// routes
router.post('/register/tmp', ProfessorAdminCreateValidation(), validate, register_prof_admin);
router.post('/admin/login', ProfessorAdminLoginValidation(), validate, login_prof_admin);

router.post('/register', authenticate_token, ProfessorCreateValidation(), validate, register_prof);
router.post('/login', ProfessorAdminLoginValidation(), validate, login_prof);

router.delete('/delete', authenticate_token, ProfessorDeleteValidation(), validate, delete_prof);

router.get('/', authenticate_token, get_profs);
router.get('/id', authenticate_token, ProfessorFindValidation(), validate, get_prof);

router.put('/update', authenticate_token, ProfessorUpdateValidation(), validate, update_prof);
router.put('/update/password', authenticate_token_prof, ProfessorUpdatePassValidation(), validate, update_prof_pass);

module.exports = router;