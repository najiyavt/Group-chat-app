const express = require('express');

const router = express.Router();

const chatsControllers = require('../controllers/chat-app');
const userAuth = require('../middleware/auth');

router.post('/chats' , userAuth.authenticate, chatsControllers.postMessages );
router.get('/' , userAuth.authenticate, chatsControllers.getAllMessages );
// router.get('/allchats' , authentication.authenticate, chatsControllers.getAllMessages );

module.exports = router ;