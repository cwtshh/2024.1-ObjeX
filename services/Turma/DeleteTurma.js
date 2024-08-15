const Turma = require('../../models/Turma')

const delete_turma =  async (req,res)=>{
    const {id} = req.params
    try{
        //Tenta encontrar por id 
        const deleteuser = await Turma.findByIdAndDelete(id)

        //verifica se achou alguma turma pelo id
        if(deleteuser){
            res.status(200).json({
            message : 'Turma deletada com sucesso'})
        } else {
        //Caso não encontre turma
            res.status(404).json({
            message : 'Turma não encontrada'})  
            }
        } catch (error){
        //Caso tenha algum erro na conexão ou em algo relacionado ao banco
            res.status(500).json({
                message : 'Erro ao deletar a Turma',
                error: error.message
            })
        }
}

module.exports = delete_turma