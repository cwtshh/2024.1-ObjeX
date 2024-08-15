const express = require('express');
const router = express();

router.get('/', (req, res) => {
    res.send('API Funcionando');
});
router.use('/grupo', require('./GrupoRoutes'));
router.use('/professor', require('./ProfessorRoutes'));
router.use('/turma', require('./TurmaRoutes'));



module.exports = router;