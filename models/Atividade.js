const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AtividadeSchema = new Schema(
    {
        nome: String,
        enunciado: String,
        turma: {
            type: Schema.Types.ObjectId,
            ref: 'Turma',
        },
        professor: {
            type: Schema.Types.ObjectId,
            ref: 'Professor',
        },
        type: {
            type: String,
            enum: ['code', 'image', 'text'],
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