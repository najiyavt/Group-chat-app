const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Messages = sequelize.define('Messages' , {
    
    name : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    }
    
})
module.exports = Messages;