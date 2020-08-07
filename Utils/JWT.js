const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');

const hashSeed = "9941a39c2fd25cb05931";
const passwordhashSeed = "9941a39c2fd25bc05931"

exports.passwordEncode = (password) => {
    return jwt.sign(password,passwordhashSeed) ;   
}

exports.passwordDecode = (encodedString) => {
    return new Promise((resolve,reject) => {
        jwt.verify(encodedString,passwordhashSeed , (err, decoded) => {
            if(decoded){
                resolve(decoded);
            }else{
                reject(`${err} , decode Failed`);
            }
        });
    });
}

exports.tokenEncode = (id) => {
    return jwt.sign(id,hashSeed) ;   
}

exports.tokenDecode = (token) => {
    return new Promise((resolve,reject) => {
        jwt.verify(token,hashSeed , (err, decoded) => {
            if(decoded){
                resolve(decoded);
            }else{
                reject(`${err} , decode Failed`);
            }
        });
    });
}


// Google Auth Verification 


const client = new OAuth2Client("token");
exports.verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "token"
  });
  const payload = ticket.getPayload();
  return payload;
}
