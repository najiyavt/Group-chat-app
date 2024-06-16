const express = require('express');

const router = express.Router();

const chatsControllers = require('../controllers/chat-app');
const userAuth = require('../middleware/auth');

router.post('/add-chats' , userAuth.authenticate, chatsControllers.postMessages );
router.get('/get-chats' , userAuth.authenticate, chatsControllers.getAllMessages );


module.exports = router ;