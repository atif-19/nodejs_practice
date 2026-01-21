const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    // extract token from Authorization header
    if(req.headers.authorization===undefined){
        return  res.status(401).json({ error: 'unauthorized' });
    }
    const token = req.headers.authorization.split(' ')[1];
    // if not token provided, return 401 unauthorized
    if (!token) {
        return res.status(401).json({ error: 'unauthorized' });
    }
    
    try{
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // attach decoded user info to request object
        req.user = decoded;
        // proceed to next middleware or route handler
        next();
    }
    catch(error){
        return res.status(401).json({ error: 'invalid token' });
    }
}
// generate the token
const generateToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username
    };
    // sign the token with secret key and set expiration
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

module.exports = {jwtAuthMiddleware, generateToken};
