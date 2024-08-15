const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TurmaSchema = new Schema(
    {
        nome: String,
        horario: String,
        professor: {
            type: Schema.Types.ObjectId,
            ref: 'Professor',
            default: null
        },
    },
    {
        timestamp: true
    },
    {
        collection: 'turmas'
    }
)

module.exports = mongoose.model('Turma', TurmaSchema);
