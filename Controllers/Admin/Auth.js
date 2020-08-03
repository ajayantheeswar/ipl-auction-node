const express = require('express');
const bodyParser = require('body-parser');
const AdminUser = require('../../Models/AdminUser');

const JWT = require('../../Utils/JWT');

exports.signUpAdmin = async (req,res,next) => {
    const {Name,Email,Password} = req.body.credientials;
    const encodedPassword = JWT.passwordEncode(Password)
    try {
        const admin = await AdminUser.create({
            name : Name,
            email : Email,
            password : encodedPassword
        })
        
        const token = admin.getDataValue("id");
        const email = admin.getDataValue("email");
        const name = admin.getDataValue("name");
        const encodedToken = JWT.tokenEncode(token);

        res.status(201).json({"Token" : encodedToken,user : {
            name,email
        }});
    }
    catch(error) {
        if(error.name === 'SequelizeUniqueConstraintError')
            res.status(400).json({"Auth Status" : "FAIL" ,"error" : "The Account Already Exists"});
        else{
            res.status(400).json({"Auth Status" : "FAIL" ,"error" : error});
        }
    }
}

exports.signInAdmin = async (req,res,next) => {
    const {Email,Password} = req.body.credientials;
    const encodedPassword = JWT.passwordEncode(Password)
    try {
        const admin = await AdminUser.findOne({
            where : {
                email : Email   
            }
        })
        
        if(!admin){
            // The Email Does not Present
            throw new Error("The e-mail does not Exixts");
        }

        const hashedPassword = admin.getDataValue("password");

        if(hashedPassword !== encodedPassword) {
            res.status(403).json({"Auth Status" : "FAIL" ,"error" : "credientials does not Match"});
            return
        }

        const token = admin.getDataValue("id");
        const email = admin.getDataValue("email");
        const name = admin.getDataValue("name");
        const encodedToken = JWT.tokenEncode(token);

        res.status(202).json({"Token" : encodedToken,user : {
            name,email
        }});
    }
    catch(error) {
        res.status(400).json({"Auth Status" : "FAIL" ,"error" : error.message});
    }
}