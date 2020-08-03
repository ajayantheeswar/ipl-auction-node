const User = require('../Models/User');
const JWT = require('../Utils/JWT');

exports.userAuth = async (req,res,next) => {
    
    const encodedtoken = req.header('authorization');
    
    try {
        const userId = await JWT.tokenDecode(encodedtoken);
        const user = await User.findByPk(userId);
        if(!user) {
            throw new Error("Auth Fail")
        }
        req.user = user;
        next();
    } 
    catch(err) {
        res.status(403).json({error : err.message});
    }
}