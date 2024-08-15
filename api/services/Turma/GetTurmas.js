const Turma = require("../../models/Turma");

const get_turmas = async (req,res) => {

    try{
        const turmas = await Turma.find()

        if(turmas){
            return res.status(201).json({
                turmas : turmas
            })
        } else {
            return res.status(404).json({
                message : 'Nenhuma turma encontrada'
            })
        }
    } catch (error){
        res.status(500).json({
            error : error.message
        })
    }

}

module.exports = get_turmas