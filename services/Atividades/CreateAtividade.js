const Atividade = require("../../models/Atividade");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// RECEBA RECEBA RECEBA RECEBA RECEBA
const create_atividade_code = async(req, res) => {
    const new_atividade = await Atividade.create({});
    if(!new_atividade) {
        return res.status(400).json({ message: 'Erro ao criar a atividade' });
    }
    const uploadDirectory = path.join(__dirname, `../../uploads/${new_atividade._id}_testcase/`);
    if(!fs.existsSync(uploadDirectory)){
        fs.mkdirSync(uploadDirectory, {recursive: true});
    }
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, uploadDirectory);
        },
        filename: function(req, file, cb){
            const filename = `${new_atividade._id}-testFile${path.extname(file.originalname)}`;
            cb(null, filename);
        }
    });
    const upload = multer({storage: storage}).single('file');
    upload(req, res, async(err) => {
        if(err){
            res.status(400).json({message: err});
        }
        else{
            const {nome, enunciado, turma, professor, type} = req.body;
            const url_arquivo_testes = req.file.path;
            const atividade = await Atividade.findByIdAndUpdate(new_atividade._id, {nome, enunciado, turma, professor, type, url_arquivo_testes}, {new: true});
            res.status(201).json(atividade);
        }
    });
}

module.exports = create_atividade_code;