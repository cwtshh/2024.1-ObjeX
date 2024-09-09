const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlunoSchema = new Schema(
    {
        nome: String,
        email: {
            type: String,
            default: ''
        },
        matricula: String,
        senha: {
            type: String,
            default: ''
        },
        in_grupo: {
            type: Boolean,
            default: false
        },
        turma: {
            type: Schema.Types.ObjectId,
            ref: 'Turma'
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    },
    {
        collections: 'alunos'
    }
);

module.exports = mongoose.model('Aluno', AlunoSchema);