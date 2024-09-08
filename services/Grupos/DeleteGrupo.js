const Grupo = require('../../models/Grupo')

const delete_grupo =  async (req,res)=>{
    const {id} = req.body

    const grupo = await Grupo.findById(id);
    if(!grupo){
        return res.status(404).json({message : 'Grupo não encontrado'})
    }
    for(const aluno of grupo.membros){
        await aluno.updateOne({$pull: {grupos: grupo._id}})
        aluno.in_grupo = false
        await aluno.save()
    }
    await Grupo.findByIdAndDelete(id)   
    res.status(200).json({message : 'Grupo deletado com sucesso'})
}

module.exports = delete_grupo