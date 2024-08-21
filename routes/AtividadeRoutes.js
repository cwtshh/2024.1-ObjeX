const express = require('express');
const router = express();

// services
const create_atividade_code = require('../services/Atividades/CreateAtividade');
const get_atividade = require('../services/Atividades/GetAtividades');

router.get('/', (req, res) => {
    res.send('ATIVIDADES');
});

router.post('/create/code', create_atividade_code);


router.get('/get', get_atividade);

module.exports = router;