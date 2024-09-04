const express = require('express');
const router = express.Router();

// services
const authenticate_token_adm = require('../services/ProfessorAdmin/AunthenticateToken');
const authenticate_token_prof = require('../services/Professor/AuthenticateTokenProf');

const register_turma =  require('../services/Turma/RegisterTurma');
const delete_turma = require('../services/Turma/DeleteTurma');
const get_turmas = require('../services/Turma/GetTurmas');
const get_turma = require('../services/Turma/GetTurma');

// middlewares
const validate = require('../middlewares/HandleValidation');

const {
    TurmaValidation
} = require('../middlewares/TurmaValidation');

//Endpoint para obter todas turmas
router.get('/', authenticate_token_prof, get_turmas);
router.get('/admin', get_turmas); // TODO adicionar verificacao de token novamente

//Endpoint para obter turma
router.get('/:id', authenticate_token_prof, get_turma);
router.get('/admin/:id', authenticate_token_adm, get_turma);

//Endpoint para registro de turma
router.post('/', authenticate_token_prof, TurmaValidation(), validate, register_turma);
router.post('/admin', authenticate_token_adm, TurmaValidation(), validate, register_turma);

//Endpoint para deletar de turma
router.delete('/delete/:id', authenticate_token_prof, delete_turma);
router.delete('/delete/admin/:id', authenticate_token_adm, delete_turma);

module.exports = router;
