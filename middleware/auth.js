const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async ( req, res, next) => {
    const token = req.header('Authorization');
    
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        
        const user = await User.findByPk(decoded.userId);
        
        req.user = user;
        next();
    }catch(error){
        console.error("Authentication error:", error);
        return res.status(401).json({ error: 'Authentication failed' });
    }
}