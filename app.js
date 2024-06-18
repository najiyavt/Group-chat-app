require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

const chatController = require('./controllers/chat-app');

app.use(
    cors({
        origin : '*' ,
        //origin: 'http://localhost:3000',
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

app.use((req, res, next) => {
    console.log('url' , req.url)
    res.sendFile(path.join(__dirname, `public/${req.url}`));
})

const User = require('./models/user');
const Message = require('./models/chat-app');
const Group = require('./models/group');
const GroupMember = require('./models/groupmembership');

User.hasMany(Message , { onDelete: 'CASCADE'});
Message.belongsTo(User);

User.belongsToMany(Group , {through: GroupMember});
Group.belongsToMany(User , { through: GroupMember});

User.hasMany(GroupMember);
GroupMember.belongsTo(User)

Group.hasMany(GroupMember);
GroupMember.belongsTo(Group);

Group.hasMany(Message  , { onDelete: 'CASCADE'});
Message.belongsTo(Group);


sequelize.sync()
    .then(result => {
        app.listen( process.env.PORT || 3000);
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Error synchronizing database:', err);
    });