require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const sequelize = require('./util/database');
const userRoutes = require('./routes/user');

const app = express();
app.use(
    cors({
        origin : 'http://192.168.1.2:5500' ,
        credentials : 'true'
}));
app.use(bodyParser.json());

app.use('/user' , userRoutes);

sequelize
    .sync()
    .then(() => { 
        app.listen( process.env.PORT)
        console.log('3000 started working')
    })
  .catch(error => console.log(error));