const express = require('express');

const router = express.Router();

const groupControllers = require('../controllers/groups');
const userAuth = require('../middleware/auth');

router.post('/create-group' , userAuth.authenticate , groupControllers.createGroup);
router.get('/get-group' , userAuth.authenticate , groupControllers.getGroups);
router.post('/join-group' , userAuth.authenticate , groupControllers.joinGroup);
router.get('/group-members', userAuth.authenticate , groupControllers.groupMembers);

module.exports = router ;