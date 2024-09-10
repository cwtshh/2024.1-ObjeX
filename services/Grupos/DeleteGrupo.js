const Grupo = require('../../models/Grupo')
const Aluno = require('../../models/Aluno')

const delete_grupo =  async (req,res)=>{
    const {id} = req.body

    const grupo = await Grupo.findById(id);
    if(!grupo){
        return res.status(404).json({message : 'Grupo não encontrado'})
    }
    for(const aluno of grupo.membros){
        await Aluno.findByIdAndUpdate(aluno,{in_grupo : false})
    }
    await Grupo.findByIdAndDelete(id)   
    res.status(200).json({message : 'Grupo deletado com sucesso'})
}

module.exports = delete_grupo