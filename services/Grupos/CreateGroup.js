const Grupo = require('../../models/Grupo');

const create_group = async(req, res) => {
    const { nome, descricao, turma, capacidade } = req.body;
    const grupo = await Grupo.create({
        nome,
        descricao,
        turma,
        capacidade
    });
    if(!grupo) return res.status(400).send({ error: 'Não foi possível criar o grupo' });

    return res.status(201).send({ grupo });
}

module.exports = create_group;