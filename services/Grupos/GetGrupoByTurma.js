const Grupo = require("../../models/Grupo");

const get_grupo_by_turma = async(req, res) => {
    const { id } = req.params;
    const grupo = await Grupo.find({ turma: id });
    return res.status(200).json(grupo);
}

module.exports = get_grupo_by_turma;