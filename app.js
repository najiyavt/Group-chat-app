require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const chatController = require('./controllers/chat-app');
const sequelize = require('./util/database');
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat-app');
const groupsRoutes = require('./routes/groups');

const User = require('./models/user');
const Message = require('./models/chat-app');
const Group = require('./models/group');
const GroupMember = require('./models/groupmembership');
const archivedChats = require('./controllers/archivedChats');
const {CronJob} = require('cron');

const job = new CronJob(
    '0 0 * * *', // Run at midnight every day
    archivedChats.archiveOldChats, // Function to call
    null, // onComplete
    true, // Start the job right now
    'Asia/Kolkata' // Time zone of this job
)

job.start();

chatController.init(io);

// io.on('connection', (socket) => {
//     console.log('New client connected');
//     socket.on('joinGroup', (groupId) => {
//       socket.join(groupId);
//     });
// });

app.use(cors({ origin: '*' , credentials: true }));
app.use(bodyParser.json());

app.use('/user' , userRoutes);
app.use('/chat-app' , chatRoutes);
app.use('/groups' , groupsRoutes);
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, `public/${req.url}`));
});


User.hasMany(Message );
Message.belongsTo(User);
User.belongsToMany(Group , {through: GroupMember} );
Group.belongsToMany(User , { through: GroupMember});
GroupMember.belongsTo(User)
GroupMember.belongsTo(Group);
Group.hasMany(Message );
Message.belongsTo(Group);


sequelize.sync()
    .then(result => {
        app.listen( process.env.PORT || 3000, () => {;
            console.log('Server is running and database synchronized');
        });
    })
    .catch(err => {
        console.error('Error synchronizing database:', err);
    });

   