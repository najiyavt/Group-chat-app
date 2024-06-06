require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const sequelize = require('./util/database');
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chats');


app.use(
    cors({
        origin : 'http://192.168.1.2:5500' ,
        credentials : 'true'
}));
app.use(bodyParser.json());

app.use('/user' , userRoutes);
app.use('/chatapp' , chatRoutes);

sequelize
    .sync()
    .then(() => { 
        app.listen( process.env.PORT)
        console.log('3000 started working')
    })
  .catch(error => console.log(error));