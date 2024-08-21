const Atividade = require("../../models/Atividade");
const multer = require('multer');
const path = require('path');
const fs = require('fs');



// nome: String, enunciado: String, turma: id(turma), professor: id(professor), type: enum['code', 'image', 'text'];
const create_atividade = async(req, res) => {
    const { nome, enunciado, turma, professor, type } = req.body;
    const new_atividade = await Atividade.create({
        nome, 
        enunciado, 
        turma, 
        professor, 
        type

    });
    if(!new_atividade) {
        return res.status(400).json({ message: 'Erro ao criar a atividade' });
    }

    const uploadDirectory = path.join(__dirname, `../../uploads/${new_atividade._id}/tests/`);
    if(!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path.join(__dirname, `../../uploads/${new_atividade._id}/tests/`));
        },
        filename: function(req, file, cb) {
            const name = file.originalname;
            console.log(file);
            cb(null, name);
        }
    });
    const upload = multer({ storage: storage }).single('file');
    upload(req, res, async function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({ message: 'Erro ao fazer upload do arquivo de testes' });
        }
        new_atividade.url_arquivo_testes = req.file.path;
        await new_atividade.save();
        return res.status(201).json(new_atividade);
    });

}

module.exports = create_atividade;