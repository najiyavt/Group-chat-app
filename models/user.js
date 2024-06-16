const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('Users' , {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email : {
        type: Sequelize.STRING,
        allowNull: false,
        unique : true
    },
    number : {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    password : {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
},{
    timestamps: true,
});

module.exports = User;