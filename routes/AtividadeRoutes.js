const express = require('express');
const router = express();

// services
const create_atividade_code = require('../services/Atividades/CreateAtividade');
const get_atividade = require('../services/Atividades/GetAtividades');
const create_atividade_image = require('../services/Atividades/CreateAtividadeImage')
const responder_atividade_imagem = require('../services/Atividades/ResponderAtividadeImagem');
const get_resposta_image = require('../services/Atividades/GetRepostaImage');

router.get('/', (req, res) => {
    res.send('ATIVIDADES');
});
router.get('/get', get_atividade);
router.post('/create/code', create_atividade_code);
router.post('/create/image', create_atividade_image);
router.post('/responder/imagem/', responder_atividade_imagem);
router.get('/imagem/', get_resposta_image);

module.exports = router;