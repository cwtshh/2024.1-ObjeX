const Professor = require("../../models/Professor");

const delete_prof = async(req, res) => {
    // recebe os dados da requisição
    const { id } = req.body;

    // procura e tenta remover registro do professor
    await Professor.findByIdAndDelete(id)
    .then(result => {
        if(result) {
            return res.status(200).json({
                message: 'Professor deletado com sucesso',
                data: result
            });
        } else {
            return res.status(404).json({
                message: 'Professor não encontrado',
            });
        }
    })
    .catch(error => {
        return res.status(200).json({
            message: 'Erro ao deletar professor',
            erro: error
        });
    });
};

module.exports = delete_prof;