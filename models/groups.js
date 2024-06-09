const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');

const Groups = sequelize.define("Groups" , {
    
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Groups;