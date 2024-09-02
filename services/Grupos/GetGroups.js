const Grupo = require('../../models/Grupo');

const get_all_grupos = async(req, res) => {
    const grupos = await Grupo.find();
    
    if(!grupos) return res.status(400).json({
        message: 'Nenhum grupo encontrado'
    });

    await Grupo.find()
    .populate({
        path: 'membros',
        select: 'nome'
    })
    .populate({
        path: 'turma',
        select: 'nome'
    });
    res.json(grupos);
};

module.exports = get_all_grupos;