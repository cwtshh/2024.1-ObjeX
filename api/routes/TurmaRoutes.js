const express = require('express')
const router = express.Router();
const register_turma =  require('../services/Turma/RegisterTurma')
const delete_turma = require('../services/Turma/DeleteTurma')
const get_turmas = require('../services/Turma/GetTurma')
const validate = require('../middlewares/HandleValidation');
const {TurmaValidation} = require('../middlewares/TurmaValidation')

router.get('/', get_turmas);
router.post('/', TurmaValidation(), validate, register_turma);
router.delete('/:id', delete_turma);
//router.patch('/')


module.exports = router;
