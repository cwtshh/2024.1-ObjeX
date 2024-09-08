const Turma = require('../../models/Turma')

const get_turma = async (req,res)=>{
    const {id} = req.params

    try{
        //Econtra uma turma por id
        const turma = await Turma.findById(id).populate({
            path: 'professor',
            select: 'nome'
        })

        //Caso a turma exista 
        if(turma){
            res.status(200).json({turma : turma})
        } else {
        //Caso a turma não exista
            res.status(404).json({message : 'Turma não encontrada'})
        }
    }catch(error){
        res.status(500).json({
            message : 'Erro ao buscar turma',
            error: error.message
        })
    }
    
}

module.exports = get_turma