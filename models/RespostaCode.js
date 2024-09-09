const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RespostaCodeSchema = new Schema(
    {
        code: {
            type: String,
            required: true
        },
        atividade_id: {
            type: Schema.Types.ObjectId,
            ref: 'Atividade'
        },
        aluno_id: {
            type: Schema.Types.ObjectId,
            ref: 'Aluno'
        },
        passed: {
            type: Boolean,
            default: false
        },
        data_resposta: {
            type: Date,
            default: Date.now
        }        
    },
    {
        timestamps: true,
    },
    {
        collection: 'respostas_code'
    }
);

module.exports = mongoose.model('RespostaCode', RespostaCodeSchema);