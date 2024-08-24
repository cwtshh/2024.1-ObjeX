const RespostaImage = require('../../models/RespostaImage');
const fs = require('fs');

const get_resposta_image = async(req, res) => {
    const { atividade_id, aluno_id } = req.query;
    const resposta = await RespostaImage.findOne({
        atividade_id,
        aluno_id
    });
    if(!resposta){
        return res.status(400).json({message: 'Resposta não encontrada'});
    }
    const imageBuffer = fs.readFileSync(resposta.image_url);
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': imageBuffer.length
    });
    res.end(imageBuffer);
};


module.exports = get_resposta_image;