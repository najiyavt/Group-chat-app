const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async ( req, res, next) => {
    const token = req.header('Authorization');
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        console.log('userID >>>> ', decoded.userId);
        
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    }catch(error){
        console.error("Authentication error:", error);
        return res.status(401).json({ error: 'Authentication failed' });
    }
}