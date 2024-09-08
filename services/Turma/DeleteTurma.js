const Turma = require('../../models/Turma')
const Professor = require('../../models/Professor')
const Aluno = require('../../models/Aluno')

const delete_turma =  async (req,res)=>{
    const {id} = req.params;
    const turma = await Turma.findById(id);
    if(!turma){
        return res.status(404).json({
            message: 'Turma não encontrada'
        });
    }
    if(!turma.professor) {
        await Turma.findByIdAndDelete(id)
        return res.status(200).json({
            message: 'Turma deletada com sucesso',
        });
    }
    // deleta alunos com a turma
    const alunos = await Aluno.find({ turma: id });
    for(const aluno in alunos) {
        await Aluno.findByIdAndDelete(aluno._id);
    }
    // deleta professor e turma
    await Professor.findByIdAndDelete(turma.professor);
    await Turma.findByIdAndDelete(id);
    return res.status(200).json({
        message: 'Turma deletada com sucesso',
    });
}
//     const turma = await Turma.findByIdAndDelete(id)
//     .then(async result => {
//         if(result) {
//             if(!turma.professor) {
                
//             }
//             const professor = await Professor.findOne({ turma: id });

//             if(!professor){
//                 return res.status(404).json({
//                     message: 'Professor não encontrado'
//                 });
//             }

//             professor.turma = null;
//             await professor.save();
            
//             return res.status(200).json({
//                 message: 'Turma deletada com sucesso',
//             });
//         } else {
//             return res.status(404).json({
//                 message: 'Turma não encontrada'
//             });
//         }
//     })
//     .catch(error => {
//         return res.status(500).json({
//             message: 'Erro ao deletar turma',
//             erro: error
//         });
//     });
// }

module.exports = delete_turma