const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AtividadeSchema = new Schema(
    {
        nome: {
            type: String,
            default: null,
        },
        enunciado: {
            type: String,
            default: null,
        },
        turma: {
            type: Schema.Types.ObjectId,
            ref: 'Turma',
            default: null,
        },
        professor: {
            type: Schema.Types.ObjectId,
            ref: 'Professor',
            default: null,
        },
        type: {
            type: String,
            enum: ['code', 'image', 'text'],
            default: 'text',
        },
        url_arquivo_testes: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true
    },
    {
        collection: 'atividades'
    }
);

module.exports = mongoose.model('Atividade', AtividadeSchema);