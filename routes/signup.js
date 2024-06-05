const express = require('express');

const router = express.Router();

const signupControllers = require('../controllers/signup');

router.post('/signup' , signupControllers.signup );

module.exports = router ;