const Grupo = require('../../models/Grupo')

const delete_grupo =  async (req,res)=>{
    const {id} = req.body

    await Grupo.findOneAndDelete({_id:id})
    .then(result => {
        if(result) {
            return res.status(200).json({
                message: 'Grupo deletado com sucesso',
                data: result
            });
        } else {
            return res.status(404).json({
                message: 'Grupo não encontrado'
            });
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: 'Erro ao deletar Grupo',
            erro: error
        });
    });
}

module.exports = delete_grupo