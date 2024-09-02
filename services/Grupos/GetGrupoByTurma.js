const Grupo = require("../../models/Grupo");

const get_grupo_by_turma = async(req, res) => {
    const { id } = req.params;
    const grupo = await Grupo.find({ turma: id })

    if(!grupo) return res.status(400).json({
        message: 'Grupo não encontrado'
    });
    
    await Grupo.find({ turma: id })
    .populate({
        path: 'membros',
        select: 'nome'
    })
    .populate({
        path: 'turma',
        select: 'nome'
    });

    return res.status(200).json(grupo);
}

module.exports = get_grupo_by_turma;