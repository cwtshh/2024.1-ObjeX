const Aluno = require("../../models/Aluno");

const delete_aluno = async(req, res) => {
    const { id } = req.params;
    try{
        const aluno = await Aluno.findByIdAndDelete(id);
        return res.status(200).json({message: 'Aluno deletado com sucesso'});
    }catch(err) {
        return res.status(404).json({message: 'Ocorreu um erro ao deletar o aluno'});
    }
    
}

module.exports = delete_aluno;