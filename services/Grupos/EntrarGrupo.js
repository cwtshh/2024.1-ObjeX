const Aluno = require('../../models/Aluno');
const Grupo = require('../../models/Grupo');

const entrar_grupo = async(req, res) => {
    const { id_grupo, id_estudante } = req.body;
    const grupo = await Grupo.findById(id_grupo);

    if(!grupo){
        return res.status(404).json({message: 'Grupo não encontrado'});
    }

    const aluno = await Aluno.findById(id_estudante);

    if(!aluno){
        return res.status(404).json({message: 'Estudante não encontrado'});
    }

    if(aluno.in_grupo){
        return res.status(400).json({message: 'Estudante já está em um grupo'});
    }

    if(grupo.membros.length >= grupo.capacidade){
        return res.status(400).json({message: 'Grupo cheio'});
    }

    if(grupo.membros.includes(id_estudante)){
        return res.status(400).json({message: 'Estudante já está no grupo'});
    }

    grupo.membros.push(id_estudante);
    await grupo.save();

    aluno.in_grupo = true;
    await aluno.save();

    return res.status(200).json({message: 'Estudante entrou no grupo'});
}

const sair_grupo = async(req, res) => {
    const { id_grupo, id_estudante } = req.body;
    const grupo = await Grupo.findById(id_grupo);

    if(!grupo){
        return res.status(404).json({message: 'Grupo não encontrado'});
    }

    const aluno = await Aluno.findById(id_estudante);

    if(!aluno){
        return res.status(404).json({message: 'Estudante não encontrado'});
    }

    if(!aluno.in_grupo){
        return res.status(400).json({message: 'Estudante não está em um grupo'});
    }

    if(!grupo.membros.includes(id_estudante)){
        return res.status(400).json({message: 'Estudante não está no grupo'});
    }

    grupo.membros = grupo.membros.filter(membro => membro != id_estudante);
    await grupo.save();

    aluno.in_grupo = false;
    await aluno.save();

    return res.status(200).json({message: 'Estudante saiu do grupo'});
}

module.exports = { entrar_grupo, sair_grupo };