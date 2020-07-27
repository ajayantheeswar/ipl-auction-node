const jwt = require('jsonwebtoken');

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