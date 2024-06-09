const { Sequelize } = require('sequelize');
const Chats = require('../models/chat-app');
const User= require('../models/user');

exports.postMessages = async ( req , res) => {
    const { groupId , chats } = req.body;
    try{
        const newchat = await Chats.create({
            UserId:req.user.id ,
            name:req.user.name,
            chats:chats ,
            GroupId: groupId
        });
        console.log('Message send and stored successfully!',newchat);
        res.status(201).json({ newchat , message:"Message sent succesfully" });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Cant send message' });
    }
}

exports.getAllMessages = async (req, res) => {
    const {groupId,lastId} = req.query;

    try {
        let chat = await Chats.findAll({ 
            where :{
                id:{
                    [Sequelize.Op.gt]: lastId
                },
                GroupId:groupId 
            },
            include: [User ]
        });
        console.log('Message got successfully!', chat);

        res.status(200).json({ chat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Unable to fetch messages' });
    }
}