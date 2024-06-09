const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Groups = require('./groups');
const User = require('./user');

const Messages = sequelize.define('Messages' , {
    
    name : {
        type: Sequelize.STRING , 
        allowNull: false,
    },
    chats: {
        type: Sequelize.TEXT,
        allowNull: false
    },
})
module.exports = Messages;