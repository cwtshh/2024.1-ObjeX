const Atividade = require('../../models/Atividade');
const RespostaCode = require('../../models/RespostaCode');
const RespostaImage = require('../../models/RespostaImage');
const RespostaText = require('../../models/RespostaTexto');

const resgatar_respostas = async(req, res) => {
    const { id_atividade } = req.params;
    
    const atividade = await Atividade.findById(id_atividade);
    if (!atividade) {
        return res.status(400).send({ error: 'Atividade não encontrada' });
    }

    if(atividade.type === 'code') {
        const respostas = await RespostaCode.find({ atividade_id: id_atividade })
        .populate({
            path: 'aluno_id',
            select: 'nome'
        })

        if(!respostas){
            return res.status(400).send({ error: 'Respostas não encontradas' });
        }
        return res.status(200).json(respostas);
    } else if(atividade.type === 'image') {
        const respostas = await RespostaImage.find({ atividade_id: id_atividade })
        .populate({
            path: 'aluno_id',
            select: 'nome'
        })

        if(!respostas){
            return res.status(400).send({ error: 'Respostas não encontradas' });
        }
        return res.status(200).json(respostas);
    } else if(atividade.type === 'text') {
        const respostas = await RespostaText.find({ atividade_id: id_atividade })
        .populate({
            path: 'aluno_id',
            select: 'nome'
        })

        if(!respostas){
            return res.status(400).send({ error: 'Respostas não encontradas' });
        }
        return res.status(200).json(respostas);
    } else {
        return res.status(400).send({ error: 'Tipo de atividade não encontrado' });
    }
}

const resgatar_todas_respostas = async(req, res) => {
    try {
        const respostas_code = await RespostaCode.find()
        .populate({
            path: 'aluno_id',
            select: 'nome'
        })
        .populate({
            path: 'atividade_id',
            select: 'nome'
        })

        const respostas_image = await RespostaImage.find()
        .populate({
            path: 'aluno_id',
            select: 'nome'
        })
        .populate({
            path: 'atividade_id',
            select: 'nome'
        })

        const respostas_text = await RespostaText.find()
        .populate({
            path: 'aluno_id',
            select: 'nome'
        })
        .populate({
            path: 'atividade_id',
            select: 'nome'
        })

        if(!respostas_code && !respostas_image && !respostas_text){
            return res.status(400).send({ message: 'Respostas não encontradas' });
        }

        return res.status(200).json({ respostas_code, respostas_image, respostas_text });
    } catch (error) {
        return res.status(400).send({ message: 'Erro ao buscar respostas' });
    }
}

module.exports = { resgatar_respostas, resgatar_todas_respostas };