const Turma = require("../../models/Turma");

const get_turmas = async (req,res) => {
    //Falta verificações
        const turmas = await Turma.find()
        return res.status(201).json({
            turmas : turmas
        })
}

module.exports = get_turmas