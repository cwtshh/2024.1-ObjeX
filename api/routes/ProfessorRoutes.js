const express = require('express');
const router = express();

// services
const { authenticate_token } = require("../services/ProfessorAdmin/AunthenticateToken");
const  register_prof_admin  = require("../services/ProfessorAdmin/RegisterProfAdmin");
const  login_prof_admin  = require("../services/ProfessorAdmin/LoginProfAdmin");

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