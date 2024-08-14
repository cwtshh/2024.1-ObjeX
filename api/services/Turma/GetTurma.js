const express = require('express')
const Turma = require("../../models/Turma");

const get_turmas = async (req,res) => {
        const turmas = Turma.find()
}

module.exports = get_turmas