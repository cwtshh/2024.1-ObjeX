const Grupo = require('../../models/Grupo');

const get_all_groupos = async(req, res) => {
    const grupos = await Grupo.find();
    if(grupos.length === 0){
        return res.status(404).json({message: 'Não há gurpos cadastrados'});
    }
    return res.status(200).json(grupos);
};

module.exports = get_all_groupos;