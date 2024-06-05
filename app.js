require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const sequelize = require('./util/database');
const userRoutes = require('./routes/signup');

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use('/user' , userRoutes);

sequelize
    .sync()
    .then(() => { 
        app.listen( process.env.PORT || 3000 , () => {
        console.log('3000 started working')
        })
    })
  .catch(error => console.log(error));