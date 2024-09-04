const express = require('express');
const router = express();

// services
const create_atividade_code = require('../services/Atividades/CreateAtividade');
const { get_atividade, get_atividades_turma, get_atividade_id } = require('../services/Atividades/GetAtividades');
const create_atividade_image = require('../services/Atividades/CreateAtividadeImage')
const responder_atividade_imagem = require('../services/Atividades/ResponderAtividadeImagem');
const get_resposta_image = require('../services/Atividades/GetRepostaImage');
const resgatar_casos_teste = require('../services/Atividades/ResgatarCasosTeste') 
const registrar_resposta_code = require('../services/RespostaCode/RegistrarRespostaCode');
const responder_atividade_texto = require('../services/Atividades/ResponderAtividadeTexto');
const create_atividade_texto = require('../services/Atividades/CreateAtividadeTexto');
const get_resposta_por_atividade_texto = require('../services/Atividades/GetRespostaPorAtividade');
const resgatar_respostas = require('../services/Atividades/GetRespostas');

router.get('/', (req, res) => {
    res.send('ATIVIDADES');
});
router.get('/get', get_atividade);
router.get('/get/:id_turma', get_atividades_turma);
router.get('/get/atividade/:id_atividade', get_atividade_id);
router.post('/create/code', create_atividade_code);
router.post('/create/image', create_atividade_image);
router.post('/create/text', create_atividade_texto);
router.post('/responder/imagem/', responder_atividade_imagem);
router.get('/imagem/', get_resposta_image);
router.get('/casos/teste/', resgatar_casos_teste);
router.post('/registrar/resposta', registrar_resposta_code);
router.post('/responder/texto', responder_atividade_texto);
router.get('/texto/:id_atividade', get_resposta_por_atividade_texto);
router.get('/resgatar/respostas/:id_atividade', resgatar_respostas);

module.exports = router;