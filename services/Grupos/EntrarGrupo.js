const Grupo = require('../../models/Grupo');

const entrar_grupo = async(req, res) => {
    const { id_grupo, id_estudante } = req.body;
    const grupo = await Grupo.findById(id_grupo);
    if(!grupo){
        return res.status(404).json({message: 'Grupo não encontrado'});
    }
    if(grupo.membros.length >= grupo.capacidade){
        return res.status(400).json({message: 'Grupo cheio'});
    }
    if(grupo.membros.includes(id_estudante)){
        return res.status(400).json({message: 'Estudante já está no grupo'});
    }
    grupo.membros.push(id_estudante);
    await grupo.save();
    return res.status(200).json({message: 'Estudante entrou no grupo'});
}

module.exports = entrar_grupo;