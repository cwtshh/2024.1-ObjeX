const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlunoSchema = new Schema(
    {
        nome: String,
        email: String,
        matricula: String,
        senha: String,
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