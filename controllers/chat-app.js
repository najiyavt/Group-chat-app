const Chats = require('../models/chat-app');
const User= require('../models/user');

exports.postMessages = async ( req , res) => {
    const { chats }  = req.body;
    console.log("I am in POST message!", chats, req.user.id );

    try{
        // const user = await User.findByPk(req.user.id);
        // if (!user) {
        //     return res.status(404).json({ error: 'User not found' });
        // }
        const newchat = await Chats.create({
            UserId:req.user.id ,
            name:req.user.name,
            chats:chats 
        });
        console.log('Message send and stored successfully!',newchat);
        res.status(201).json({ newchat , message:"Message sent succesfully" });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Cant send message' });
    }
 }
exports.getAllMessages = async (req, res) => {
   
    try {
        let chat = await Chats.findAll({ 
            include: { 
                model: User,  
                attributes: ['name']
            }
        });
        res.status(200).json({ chat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Unable to fetch messages' });
    }
}