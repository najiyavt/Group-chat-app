const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Messages = sequelize.define('Messages' , {
    
    name : {
        type: Sequelize.STRING , 
        allowNull: false,
    },
    chats: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW 
    },
    
})
module.exports = Messages;