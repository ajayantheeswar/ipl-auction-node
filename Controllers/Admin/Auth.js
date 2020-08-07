const express = require('express');
const bodyParser = require('body-parser');
const AdminUser = require('../../Models/AdminUser');

const JWT = require('../../Utils/JWT');

exports.signUpAdmin = async (req,res,next) => {

    const {authType} = req.body.credientials;

    let user = {};

    try {
        let googleToken;
        if(authType === 'Google') {
            const {tokenId} = req.body.credientials;
            tokenIdValue = tokenId;
            const payload = await JWT.verifyGoogleToken(tokenId);
            const {email,name} = payload;
            user.name = name;
            user.email = email;
            user.authType = 'Google';
        }else{
            const {Name,Email,Password} = req.body.credientials;
            const encodedPassword = JWT.passwordEncode(Password);
            user.name = Name;
            user.email = Email;
            user.authType = 'EMP';
            user.password = encodedPassword;
        }
   
        const admin = await AdminUser.create(user);
        
        
        const token = admin.getDataValue("id");
        const email = admin.getDataValue("email");
        const name = admin.getDataValue("name");
        const encodedToken = authType === 'Google' ? tokenIdValue : JWT.tokenEncode(token);

        res.status(201).json({"Token" : encodedToken,'user' : {
            name,email
        }});
    }
    catch(error) {
        if(error.name === 'SequelizeUniqueConstraintError')
            res.status(400).json({"Auth Status" : "FAIL" ,"error" : "The Account Already Exists"});
        else{
            res.status(400).json({"Auth Status" : "FAIL" ,"error" : error.message});
        }
    }
}

exports.signInAdmin = async (req,res,next) => {

    const {authType} = req.body.credientials;
    let user = {};

    try {
        let googleToken;
        if(authType === 'Google') {
            const {tokenId} = req.body.credientials;
            tokenIdValue = tokenId;
            const payload = await JWT.verifyGoogleToken(tokenId);
            user.email = payload.email;
        }
        else{
            const {Email,Password} = req.body.credientials;
            const encodedPassword = JWT.passwordEncode(Password);
            user.email = Email;
            user.encodedPassword = encodedPassword;
        }
        const admin = await AdminUser.findOne({
            where : {
                email : user.email   
            }
        })
        
        if(!admin){
            // The Email Does not Present
            throw new Error("The e-mail does not Exixts");
        }

        if(authType === 'EMP'){
            // Verify the password if auth type is EMP
            const hashedPassword = admin.getDataValue("password");
            if(hashedPassword !== encodedPassword) {
                res.status(403).json({"Auth Status" : "FAIL" ,"error" : "credientials does not Match"});
                return
            }
        }

        const token = admin.getDataValue("id");
        const email = admin.getDataValue("email");
        const name = admin.getDataValue("name");
        const encodedToken = authType === 'Google' ? tokenIdValue : JWT.tokenEncode(token);

        res.status(202).json({"Token" : encodedToken,user : {
            name,email
        }});
    }
    catch(error) {
        res.status(400).json({"Auth Status" : "FAIL" ,"error" : error.message});
    }
}