require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(
    cors({
        origin : 'http://192.168.1.2:5500' ,
        credentials : 'true'
}));
app.use(bodyParser.json());

const sequelize = require('./util/database');

const userRoutes = require('./routes/user');
app.use('/user' , userRoutes);

const chatRoutes = require('./routes/chat-app');
app.use('/chat-app' , chatRoutes);

const groupsRoutes= require('./routes/groups');
app.use('/groups' , groupsRoutes);

const User = require('./models/user');
const Messages = require('./models/chat-app');
const Groups = require('./models/groups');
const GroupMembership = require('./models/groupMembership');

User.hasMany(Messages , { onDelete: 'CASCADE'});
Messages.belongsTo(User);

// User.hasMany(GroupMembership  , { onDelete: 'CASCADE'});
// GroupMembership.belongsTo(User)

User.belongsToMany(Groups,{through: 'GroupMembership'});
Groups.belongsToMany(User , { through: 'GroupMembership'});

Groups.hasMany(Messages  , { onDelete: 'CASCADE'});
Messages.belongsTo(Groups);

Groups.hasMany(GroupMembership  , { onDelete: 'CASCADE'});
GroupMembership.belongsTo(Groups);


sequelize
    .sync()
    .then(() => { 
        app.listen( process.env.PORT)
        console.log('3000 started working')
    })
  .catch(error => console.log(error));