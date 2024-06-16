const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');
const Group = require('./groups');

const GroupMembership = sequelize.define('GroupMembership', {
    UserId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    GroupId: {
        type: Sequelize.INTEGER,
        references: {
            model: Group,
            key: 'id'
        },
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = GroupMembership;
