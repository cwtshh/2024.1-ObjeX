const express = require('express');
const router = express();

const create_group = require('../services/Grupos/CreateGroup');
const get_all_grupos = require("../services/Grupos/GetGroups");

// middlewares
const { GroupCreateValidation } = require('../middlewares/GroupValidation');
const { GroupUpdateValidation } = require('../middlewares/GroupValidation');
const validate = require('../middlewares/HandleValidation');
const authenticate_token_adm = require("../services/ProfessorAdmin/AunthenticateToken");
const {entrar_grupo, sair_grupo} = require('../services/Grupos/EntrarGrupo');
const get_grupo_by_turma = require('../services/Grupos/GetGrupoByTurma')
const edit_grupo = require('../services/Grupos/EditGrupo')


router.post('/create', GroupCreateValidation(), validate, create_group);
router.get('/',  get_all_grupos);
router.get('/:id', get_grupo_by_turma);
router.put('/:id', GroupUpdateValidation(), validate, edit_grupo);
router.post('/entrar', entrar_grupo);
router.post('/sair', sair_grupo);

module.exports = router;