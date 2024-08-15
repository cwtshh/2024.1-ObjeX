const express = require('express');
const router = express();

const create_group = require('../services/Grupos/CreateGroup');
const get_all_groupos = require("../services/Grupos/GetGroups");

// middlewares
const { GroupCreateValidation } = require('../middlewares/GroupValidation');
const validate = require('../middlewares/HandleValidation');
const authenticate_token = require("../services/ProfessorAdmin/AunthenticateToken");


router.post('/create', GroupCreateValidation(), validate, create_group);
router.get('/',  get_all_groupos);

module.exports = router;