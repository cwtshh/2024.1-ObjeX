const express = require('express');
const router = express();

const run_interpreter_code_and_test = require('../services/RunInterpreterCode')

router.post('/interpreter', run_interpreter_code_and_test);


module.exports = router;