const express = require('express');
const router = express();

// controllers
const register_aluno = require('../services/Aluno/RegisterAluno');
const activate_register = require('../services/Aluno/ActivateRegister');
const login_aluno = require("../services/Aluno/LoginAluno");
const login_token = require('../services/Aluno/LoginTokenAluno');
const get_alunos = require('../services/Aluno/GetAluno');
const delete_aluno = require('../services/Aluno/DeleteAluno');
const primeiro_acesso = require('../services/Aluno/PrimeiroAcesso');
const registrar_varios_alunos = require('../services/Aluno/RegisterVariosAlunos')


// middlewares
const { AlunoCreateValidation, AlunoActivateValidation, AlunoLoginValidation } = require('../middlewares/AlunoValidation');
const validate = require('../middlewares/HandleValidation');
const authenticate_token_aluno = require('../services/Aluno/AuntheticateToken');
const authenticate_token_prof = require('../services/Professor/AuthenticateTokenProf');


router.post('/register', AlunoCreateValidation(), validate, register_aluno);
router.post('/register/primeiroacesso', primeiro_acesso);
router.post('/register/activate', AlunoActivateValidation(), validate, activate_register);
router.post('/login', AlunoLoginValidation(), validate, login_aluno);
router.post('/login/token', login_token);
router.get('/', authenticate_token_aluno, get_alunos);
router.delete('/delete/:id', authenticate_token_prof, delete_aluno);
router.post('/register/many', registrar_varios_alunos);


module.exports = router;
