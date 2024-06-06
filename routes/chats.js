const express = require('express');

const router = express.Router();

const chatsControllers = require('../controllers/chats');
const userAuth = require('../middleware/auth');

router.post('/message' , userAuth.authenticate, chatsControllers.postMessage );
//router.get('/users' , authentication.authenticate, chatsControllers.postMessage );

module.exports = router ;