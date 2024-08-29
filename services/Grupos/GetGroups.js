const Grupo = require('../../models/Grupo');

const get_all_groupos = async(req, res) => {
    const grupos = await Grupo.find().populate({
        path: 'membros',
        select: 'nome'
    }).populate({
        path: 'turma',
        select: 'nome'
    });
    res.json(grupos);
};

module.exports = get_all_groupos;