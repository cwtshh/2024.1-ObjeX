const express = require('express');
const router = express();

// controllers
const register_aluno = require('../services/Aluno/RegisterAluno');
const activate_register = require('../services/Aluno/ActivateRegister');
const login_aluno = require("../services/Aluno/LoginAluno");
const login_token = require('../services/Aluno/LoginTokenAluno');


// middlewares
const { AlunoCreateValidation, AlunoActivateValidation, AlunoLoginValidation } = require('../middlewares/AlunoValidation');
const validate = require('../middlewares/HandleValidation');
const authenticate_token = require("../services/Professor/AuthenticateTokenProf");

router.get('/', (req, res) => {
    res.send('ALUNO RTOAS');
});
router.post('/register', AlunoCreateValidation(), validate, register_aluno);
router.post('/register/activate', AlunoActivateValidation(), validate, activate_register);
router.post('/login', AlunoLoginValidation(), validate, login_aluno);
router.post('/login/token', login_token);


module.exports = router;
