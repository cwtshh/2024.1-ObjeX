const RespostaImage = require('../../models/RespostaImage');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Atividade = require('../../models/Atividade');

const responder_atividade_imagem = async(req, res) => {
    const {atividade_id, aluno_id} = req.query;
    const atividade_ref = await Atividade.findById(atividade_id);
    if(!atividade_ref){
        return res.status(400).json({message: 'Atividade não encontrada'});
    }
    const uploadDirectory = path.join(__dirname, `../../respostas/imagem/${atividade_id}/${aluno_id}/`);
    if(!fs.existsSync(uploadDirectory)){
        fs.mkdirSync(uploadDirectory, {recursive: true});
    }
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, uploadDirectory);
        },
        filename: function(req, file, cb){
            const filename = `${aluno_id}-resposta${path.extname(file.originalname)}`;
            cb(null, filename);
        }
    });
    const upload = multer({storage: storage}).single('file');
    upload(req, res, async(err) => {
        if(err){
            return res.status(400).json({message: err});
        }
        const new_resposta = await RespostaImage.create({
            atividade_id,
            aluno_id,
            image_url: uploadDirectory + req.file.filename
        });
        if(!new_resposta){
            return res.status(400).json({message: 'Erro ao salvar a resposta'});
        }
        res.status(201).json(new_resposta);
    });

}

module.exports = responder_atividade_imagem;