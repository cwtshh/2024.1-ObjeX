const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RespostaImageSchema = new Schema(
    {
        atividade_id: {
            type: Schema.Types.ObjectId,
            ref: 'Atividade',
            required: true
        },
        aluno_id: {
            type: Schema.Types.ObjectId,
            ref: 'Aluno',
            required: true
        },
        image_url: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    },
    {
        collection: 'respostas_image'
    }
);

module.exports = mongoose.model('RespostaImage', RespostaImageSchema);