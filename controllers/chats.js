const Chats = require('../models/chats');
const User= require('../models/user');

exports.postMessage = async ( req , res) => {
    const { message }  = req.body;
    console.log("I am in POST message!", message, req.user.id );

    try{
        const newMessage = await Chats.create({
            UserId:req.user.id ,
            name: req.user.name ,
            message:message 
        });
        console.log('Message sent and stored successfully!',newMessage);
        res.status(201).json({ newMessage , message:"Message sent succesfully" });
    } catch (error) {
        console.error('Error posting message:', error);
        res.status(500).json({ error: 'Cant send message' });
    }
}
