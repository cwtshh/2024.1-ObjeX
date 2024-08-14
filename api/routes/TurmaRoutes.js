const express = require('express')
const router = require('router')
const register_turma =  require('../services/Turma/RegisterTurma')
const get_turmas = require('../services/Turma/GetTurma')


router.get('/turmas',get_turmas)
router.post('/turmas',register_turma)

