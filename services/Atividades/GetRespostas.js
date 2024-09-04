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

    let respostas;

    switch (atividade.type) {
        case 'code':
            respostas = await RespostaCode.find({ atividade_id: id_atividade })
            .populate({
                path: 'aluno_id',
                select: 'nome'
            })
        case 'image':
            respostas = await RespostaImage.find({ atividade_id: id_atividade })
            .populate({
                path: 'aluno_id',
                select: 'nome'
            })
        case 'text':
            respostas = await RespostaText.find({ atividade_id: id_atividade })
            .populate({
                path: 'aluno_id',
                select: 'nome'
            })
    }

    if(!respostas){
        return res.status(400).send({ error: 'Respostas não encontradas' });
    }
    return res.status(200).json(respostas);
}

module.exports = resgatar_respostas;