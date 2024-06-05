const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async ( req, res, next) => {
    try{
        const token = req.header('Authorization');
        console.log(token);
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        console.log('userID >>>> ', decoded.userId);
        
        const userDetails = await User.findByPk(decoded.userId);
        req.user = userDetails;
        next();
    }catch(err){
        console.error("Authentication error:", err);
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
}