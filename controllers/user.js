const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

exports.login = async ( req , res) => {
    const  { email , password } = req.body;
    try{ 
        const user = await User.findOne({where:{email}});
        if(!user){
            res.status(400).json({ error: 'User not found!!Please signup' });
        }
        const comparePassword= await bcrypt.compare(password,user.password);
        if(comparePassword){
            const token = generateToken(user.id, user.name);
            res.status(200).json({ success: true, message: 'User logged in successfully', token });
        } else {
            return res.status(401).json({ success: false, message: 'User not authorized' });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Server error while logging ' })
    }
}

function generateToken(id , name){
    return jwt.sign({userId:id , name:name} , process.env.JWT_SECRET);
}