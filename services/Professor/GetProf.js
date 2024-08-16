const Professor = require("../../models/Professor");

const get_prof = async(req, res) => {
    const { id } = req.params;

    // procura um professor pelo id
    await Professor.findById(id)
    .select('_id nome email turma role createdAt updatedAt')
    .then(result => {
        if(result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({
                message: 'Professor não encontrado',
            });
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: 'Erro ao encontrar professor',
            erro: error
        });
    });
}

const get_profs = async(req, res) => {
    // retorna todos os professores do banco
    await Professor.find()
    .select('_id nome email turma role createdAt updatedAt')
    .then(result => {
        if(result && result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({
                message: 'Não há professores cadastrados'
            });
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: 'Erro ao encontrar professores',
            erro: error
        });
    });
}

module.exports = {
    get_prof,
    get_profs
}