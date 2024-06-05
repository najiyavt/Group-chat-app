const User = require('../models/user');
const bcrypt = require('bcrypt')

exports.signup = async ( req , res) => {
    const { name , email , number ,password } = req.body;
    try{
        const existinEmail = await User.findOne({ where : { email }});
        if(existinEmail){
            res.status(400).json({error: 'Email already exists'});
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = User.create({ name , email , number ,password:hashedPassword });
        res.status(200).json({ newUser, success: true, message: 'New user created' });
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Server error while creating new user' })
    }
}