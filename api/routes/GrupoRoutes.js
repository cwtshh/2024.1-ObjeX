const express = require('express');
const router = express();

const create_group = require('../services/Grupos/CreateGroup');

// middlewares
const { GroupCreateValidation } = require('../middlewares/GroupValidation');
const validate = require('../middlewares/HandleValidation');

router.post('/', GroupCreateValidation(), validate, create_group);


module.exports = router;