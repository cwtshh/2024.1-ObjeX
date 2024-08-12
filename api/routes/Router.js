const express = require('express');
const router = express();

router.get('/', (req, res) => {
    res.send('API Funcionando');
});

router.use('/professor', require('./ProfessorRoutes'));


module.exports = router;