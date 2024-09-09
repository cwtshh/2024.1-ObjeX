const Atividade = require("../../models/Atividade");

const delete_atividade = async(req, res) => {
    const { id } = req.params;
    const atividade = await Atividade.findByIdAndDelete(id);
    if(!atividade){
        return res.status(404).json({
            message: 'Atividade não encontrada'
        });
    }
    return res.status(200).json({
        message: 'Atividade deletada com sucesso'
    });
}

module.exports = delete_atividade;