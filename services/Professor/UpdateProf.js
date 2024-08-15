const Professor = require("../../models/Professor");
const bcrypt = require("bcryptjs");

const update_prof = async(req, res) => {
    // parametros: id do professor a ser atualizado
    const { id, nome, id_turma, role } = req.body;

    // procura e tenta atualizar os dados do professor
    try {
        await Professor.findByIdAndUpdate(
            id,
            { $set: { nome: nome, turma: id_turma, role: role } },
            { new: true }
        )
        .select('_id nome email turma role createdAt updatedAt')
        .then(result => {
            if (result) {
                return res.status(200).json({
                    message: 'Professor atualizado com sucesso',
                    data: result
                });
            } else {
                return res.status(404).json({
                    message: 'Falha ao atualizar Professor - professor não encontrado'
                });
            }
        });
    } catch(error){
        return res.status(500).json({
            message: 'Erro ao atualizar Professor',
            erro: error
        });
    }
}

const update_prof_pass = async(req, res) => {
    // parametros: id do professor, antiga e nova senha
    const { id, old_pass, new_pass } = req.body;

    // procura e tenta atualizar a senha
    try {
        const prof_update = await Professor.findById(id)

        // verifica se a senha antiga está correta
        const pass = await bcrypt.compare(old_pass, prof_update.senha);

        if(!pass) return res.status(401).json({
            message: 'Senha antiga incorreta'
        });

        // criptografa a nova senha
        const hash = await bcrypt.genSalt();
        const new_pass_hash = await bcrypt.hash(new_pass, hash);

        // tenta atualizar a senha do professor
        await prof_update.updateOne(
            { $set: { senha: new_pass_hash } },
            { new: true }
        ).then(result => {
            if (result) {
                return res.status(200).json({
                    message: 'Senha atualizada com sucesso',
                    data: result
                });
            } else {
                return res.status(404).json({
                    message: 'Falha ao atualizar senha - professor não encontrado'
                });
            }
        });
    } catch(error){
        return res.status(500).json({
            message: 'Erro ao atualizar senha',
            erro: error
        });
    }
}

module.exports = {
    update_prof_pass,
    update_prof
};