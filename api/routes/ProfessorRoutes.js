const express = require('express');
const router = express();

// controllers
const {
    authenticate_token,
    register_prof_admin
} = require('../controller/ProfessorController');

// middlewares
const {
    ProfessorAdminCreateValidation
} = require('../middlewares/ProfessorAdminValidations');

router.get('/', (req, res) => {
    res.send('Rota de professores');
});
router.post('/register/tmp', ProfessorAdminCreateValidation, register_prof_admin);



module.exports = router;