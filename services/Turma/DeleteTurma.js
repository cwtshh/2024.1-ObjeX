const Turma = require('../../models/Turma')
const Professor = require('../../models/Professor')
const Aluno = require('../../models/Aluno')

const delete_turma =  async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    const turma = await Turma.findById(id);
    if(!turma){
        return res.status(404).json({
            message: 'Turma não encontrada'
        });
    }
    const alunos = await Aluno.find({ turma: id });
    if(!turma.professor && !alunos) {
        await Turma.findByIdAndDelete(id)
        return res.status(200).json({
            message: 'Turma deletada com sucesso',
        });
    }
    // deleta alunos com a turma
    alunos.forEach(async (aluno) => {
        await Aluno.findByIdAndDelete(aluno._id);
    })
    // deleta professor e turma
    await Professor.findByIdAndDelete(turma.professor);
    await Turma.findByIdAndDelete(id);
    return res.status(200).json({
        message: 'Turma deletada com sucesso',
    });
}

module.exports = delete_turma