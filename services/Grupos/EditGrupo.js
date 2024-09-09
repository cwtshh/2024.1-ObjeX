const Grupo = require('../../models/Grupo');

const edit_group = async(req, res) => {
    const { id } = req.params;
    const { nome, descricao, capacidade } = req.body;

    try{
        grupo = await Grupo.findById(id);

        if ( capacidade < grupo.membros.length ) {
            return res.status(400).json({
                message:'A capacidade não pode ser inferior à quantidade de membros atual'
            })
        }

        await Grupo.findByIdAndUpdate(
            id,
            { $set: { nome: nome, descricao: descricao, capacidade: capacidade } },
            { new: true }
        )
        .then(result => {
            if (result) {
                return res.status(200).json({
                    message: 'Grupo atualizado com sucesso',
                    data: result
                });
            } else {
                return res.status(404).json({
                    message: 'Falha ao atualizar Grupo - Grupo não encontrado'
                });
            }
        });
    } catch(error){
        return res.status(500).json({
            message: 'Erro ao atualizar Grupo',
            erro: error
        });
    }
}

module.exports = edit_group;