const Chats = require('../models/chat-app');
const Group = require('../models/group');
const User= require('../models/user');



exports.postMessages = async ( req , res) => {
    const {  groupId , chats } = req.body;
    try{
        const group = await Group.findByPk(groupId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found.' });
        };
        
        const newMessage = await Chats.create({
            UserId:req.user.id ,
            chats:chats ,
            GroupId: groupId
        });
        const messageWithUser = await Chats.findOne({
            where: { id: newMessage.id },
            include: [{
                model: User,
                attributes: ['username']
            }]
        });
        console.log('Message send and stored successfully!',messageWithUser);
        res.status(201).json({ newMessage:messageWithUser , message:"Message sent succesfully" });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Cant send message' });
    }
}

exports.getAllMessages = async (req, res) => {
    const groupId = req.query.groupId;

    try {
        const group = await Group.findByPk(groupId);
        let messages = await Chats.findAll({
            where: { GroupId: groupId },
            include: [{
                model: User,
                attributes: ['username']
            }]
        });
        console.log('Message got successfully!', messages);

        res.json( messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, error: 'Unable to fetch messages' });
    }
}