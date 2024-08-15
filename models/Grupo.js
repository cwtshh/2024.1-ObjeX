const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
    {
        nome: String,
        descricao: String,
        turma: String,
        membros: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Aluno'
            }
        ],
        capacidade: Number,
    },
    {
        timestamps: true
    },
    {
        collection: 'grupos'
    }
);

module.exports = mongoose.model('Grupo', GroupSchema);