
const AdminUser = require('../Models/AdminUser');
const JWT = require('../Utils/JWT');

exports.adminAuth = async (req,res,next) => {
    
    const encodedtoken = req.header('authorization');
    
    try {
        const userId = await JWT.tokenDecode(encodedtoken);
        const user = await AdminUser.findByPk(userId);
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