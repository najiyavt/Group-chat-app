const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Chats = sequelize.define('Chats' , {
    
    chats: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    name : {
        type: Sequelize.STRING , 
        allowNull: false,
    },
    
})
module.exports = Chats;