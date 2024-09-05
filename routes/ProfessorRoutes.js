const express = require('express');
const router = express();

// services
const authenticate_token_prof = require("../services/Professor/AuthenticateTokenProf");
const authenticate_token_adm = require("../services/ProfessorAdmin/AunthenticateToken");
const register_prof_admin  = require("../services/ProfessorAdmin/RegisterProfAdmin");
const login_prof_admin  = require("../services/ProfessorAdmin/LoginProfAdmin");

const register_prof = require('../services/Professor/RegisterProf');
const login_prof = require('../services/Professor/LoginProf');
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

router.post('/register', ProfessorCreateValidation(), validate, register_prof); // TODO adicionar validacao de token novamente
router.post('/login', ProfessorAdminLoginValidation(), validate, login_prof);

router.delete('/delete', authenticate_token_adm, ProfessorDeleteValidation(), validate, delete_prof);

router.get('/admin/get', authenticate_token_adm, get_profs);
router.get('/admin/get/:id', authenticate_token_adm, ProfessorFindValidation(), validate, get_prof);

router.get('/get', authenticate_token_prof, get_profs); // TODO listar só os professores normais, arrumar !
router.get('/get/:id', authenticate_token_prof, ProfessorFindValidation(), validate, get_prof);

router.put('/update', authenticate_token_adm, ProfessorUpdateValidation(), validate, update_prof);
router.put('/update/password', authenticate_token_prof, ProfessorUpdatePassValidation(), validate, update_prof_pass);

module.exports = router;