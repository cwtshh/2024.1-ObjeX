const Professor = require("../../models/Professor");

const delete_prof = async(req, res) => {
    // recebe os dados da requisição
    const { id, id_delete } = req.body;

    // verifica se está deletando o próprio usuário
    if(id === id_delete) return res.status(500).json({
        message: 'Erro ao deletar professor',
        erro: 'Não é possível deletar o próprio usuário'
    });

    // tenta remover registro do professor que não seja admin
    await Professor.findOneAndDelete({_id: id_delete, role: { $ne: 'admin' } })
    .then(result => {
        if(result) {
            return res.status(200).json({
                message: 'Professor deletado com sucesso',
                data: result
            });
        } else {
            return res.status(404).json({
                message: 'Professor não encontrado'
            });
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: 'Erro ao deletar professor',
            erro: error
        });
    });
};

module.exports = delete_prof;