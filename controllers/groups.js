const Groups = require('../models/groups');
const GroupMembership = require('../models/groupMembership');
const User = require('../models/user');
const Chats = require('../models/chat-app');
const sequelize= require('sequelize');

exports.createGroup = async( req, res) => {
    const {groupName } = req.body;
    try{
        const newGroup = await Groups.create({name:groupName });
        // await GroupMembership.create({GroupId: newGroup.id , UserId:req.user.id });
        console.log('Group created successfully!', newGroup);
        res.status(201).json({ newGroup , message: 'Group created successfully'})
    } catch(error){
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Unable to create group' });
    }
}

exports.getGroups = async( req, res) => {
    try{
         const groups = await Groups.findAll()
        //     include :{ 
        //         model:User,
        //         attributes: ['name'],
        //         through:{attributes:[]}
        //     }
        // });
        console.log('Group fetched successfully!', groups);

        res.status(200).json( {groups});
    }catch(error){
        console.error('Error fetching group:', error);
        res.status(500).json({ error: 'Unable to fetch groups' });
    }
};

exports.joinGroup =  async (req, res) => {
    const { groupId } = req.body;
    const userId = req.user.id; 
    try{
        const group = await Groups.findByPk(groupId);
        const user = await User.findByPk(userId);
        await group.addUser(user);
        res.status(200).json({ message: 'You have successfully joined the group' });
    } catch (error) {
        console.error('Error joining group:', error);
        res.status(500).json({ error: 'An error occurred while joining the group' });
    }
}

exports.groupMembers = async (req , res) => {
    const { groupId } = req.query;
    try{
        const group = await Groups.findByPk(groupId ,{
            include:[User]
        });
        const members = group.Users.map(member => User.name);
        res.status(200).json({ members });
    } catch (error) {
        console.error('Error fetching group members:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}