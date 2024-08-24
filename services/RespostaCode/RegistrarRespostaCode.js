const RespostaCode = require('../../models/RespostaCode');

const registrar_resposta_code = async(req, res) => {
    const { code, atividade_id, usuario_id, passed } = req.body;
    const resposta = await RespostaCode.findOne({atividade_id, usuario_id});
    if(resposta) {
        await resposta.updateOne({$set: {code, passed}}, {new: true});
        return res.status(200).json({
            message: 'Resposta atualizada com sucesso',
            data: resposta
        });
    };
    const nova_resposta = await RespostaCode.create({code, atividade_id, usuario_id, passed});
    if(!nova_resposta) {
        return res.status(500).json({
            message: 'Erro ao registrar resposta'
        });
    }
    return res.status(201).json({
        message: 'Resposta registrada com sucesso',
        data: nova_resposta
    });
}

module.exports = registrar_resposta_code;