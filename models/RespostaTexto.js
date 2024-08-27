const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RespostaTextoSchema = new Schema(
    {
        resposta: {
            type: String,
            default: null,
        },
        atividade: {
            type: Schema.Types.ObjectId,
            ref: 'Atividade',
            default: null,
        },
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Aluno',
            default: null,
        },
    },
    {
        timestamps: true
    },
    {
        collection: 'respostas_texto'
    }
);

module.exports = mongoose.model('RespostaTexto', RespostaTextoSchema);