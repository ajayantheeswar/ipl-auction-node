
const AdminUser = require('../Models/AdminUser');
const JWT = require('../Utils/JWT');

exports.adminAuth = async (req,res,next) => {
    
    const encodedtoken = req.header('authorization');
    const type = req.header('type');
    
    try {
        let user ;
        if(type === 'Google') {
            const payload = await JWT.verifyGoogleToken(encodedtoken);
            user = await AdminUser.findOne({
                where : {
                    email : payload.email
                }
            });
        }else{
            const userId = await JWT.tokenDecode(encodedtoken);
            user = await AdminUser.findByPk(userId);
        }
       
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