const express = require('express')
const router = express.Router();
const register_turma =  require('../services/Turma/RegisterTurma')
const get_turmas = require('../services/Turma/GetTurma')
const validate = require('../middlewares/HandleValidation');
const {TurmaValidation} = require('../middlewares/TurmaValidation')

router.get('/', get_turmas);
router.post('/', TurmaValidation(), validate, register_turma);


module.exports = router;
