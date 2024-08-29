const express = require('express');
const router = express();

const create_group = require('../services/Grupos/CreateGroup');
const get_all_groupos = require("../services/Grupos/GetGroups");

// middlewares
const { GroupCreateValidation } = require('../middlewares/GroupValidation');
const validate = require('../middlewares/HandleValidation');
const authenticate_token_adm = require("../services/ProfessorAdmin/AunthenticateToken");
const entrar_grupo = require('../services/Grupos/EntrarGrupo');
const get_grupo_by_turma = require('../services/Grupos/GetGrupoByTurma')


router.post('/create', GroupCreateValidation(), validate, create_group);
router.get('/',  get_all_groupos);
router.post('/entrar', entrar_grupo);
router.get('/:id', get_grupo_by_turma);

module.exports = router;