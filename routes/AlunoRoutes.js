const express = require('express');
const router = express();

// controllers
const {register_aluno, update_aluno, get_senha} = require('../services/Aluno/RegisterAluno');
const activate_register = require('../services/Aluno/ActivateRegister');
const login_aluno = require("../services/Aluno/LoginAluno");
const login_token = require('../services/Aluno/LoginTokenAluno');
const get_alunos = require('../services/Aluno/GetAluno');
const delete_aluno = require('../services/Aluno/DeleteAluno');
const primeiro_acesso = require('../services/Aluno/PrimeiroAcesso');
const registrar_varios_alunos = require('../services/Aluno/RegisterVariosAlunos')
const get_aluno_by_turma = require('../services/Aluno/GetAlunoByTurma');


// middlewares
const { AlunoCreateValidation, AlunoActivateValidation, AlunoLoginValidation } = require('../middlewares/AlunoValidation');
const validate = require('../middlewares/HandleValidation');
const authenticate_token_aluno = require('../services/Aluno/AuntheticateToken');
const authenticate_token_prof = require('../services/Professor/AuthenticateTokenProf');

// TODO adicionar validacoes de token novamente
router.post('/register', AlunoCreateValidation(), validate, register_aluno);
router.post('/register/primeiroacesso', primeiro_acesso);
router.post('/register/activate', AlunoActivateValidation(), validate, activate_register);
router.post('/login', AlunoLoginValidation(), validate, login_aluno);
router.post('/login/token', login_token);
router.get('/', get_alunos);
router.put('/update/', update_aluno);
router.delete('/delete/:id', delete_aluno);
router.post('/register/many', registrar_varios_alunos);
router.get('/turma', get_aluno_by_turma);
router.post('/recuperarsenha', get_senha)


module.exports = router;
