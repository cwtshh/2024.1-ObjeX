const express = require('express')
const router = express.Router();
const register_turma =  require('../services/Turma/RegisterTurma')
const delete_turma = require('../services/Turma/DeleteTurma')
const get_turmas = require('../services/Turma/GetTurmas')
const validate = require('../middlewares/HandleValidation');
const {TurmaValidation} = require('../middlewares/TurmaValidation');
const get_turma = require('../services/Turma/GetTurma');

//Endpoint para obter todas turmas
router.get('/', get_turmas);
//Endpoint para obter turma
router.get('/:id', get_turma);
//Endpoint para registro de turma
router.post('/', TurmaValidation(), validate, register_turma);
//Endpoint para deletar de turma
router.delete('/:id', delete_turma);

module.exports = router;
