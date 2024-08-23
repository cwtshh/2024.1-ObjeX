const Atividade = require("../../models/Atividade");
const fs = require('fs');

const resgatar_casos_teste = async(req, res) => {
    const { atividade_id } = req.query;
    const atividade = await Atividade.findById(atividade_id);
    if(!atividade){
        return res.status(400).json({message: 'Atividade não encontrada'});
    }
    const file = atividade.url_arquivo_testes;
    const file_content = fs.readFileSync(file);
    res.end(file_content);
};

module.exports = resgatar_casos_teste;