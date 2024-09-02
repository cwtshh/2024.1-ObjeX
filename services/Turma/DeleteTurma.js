const Turma = require('../../models/Turma')
const Professor = require('../../models/Professor')

const delete_turma =  async (req,res)=>{
    const {id} = req.params

    await Turma.findByIdAndDelete(id)
    .then(async result => {
        if(result) {
            const professor = await Professor.findOne({ turma: id });

            if(!professor){
                return res.status(404).json({
                    message: 'Professor não encontrado'
                });
            }

            professor.turma = null;
            await professor.save();
            
            return res.status(200).json({
                message: 'Turma deletada com sucesso',
            });
        } else {
            return res.status(404).json({
                message: 'Turma não encontrada'
            });
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: 'Erro ao deletar turma',
            erro: error
        });
    });
}

module.exports = delete_turma