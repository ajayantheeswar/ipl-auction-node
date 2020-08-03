const express = require('express');
const router = express.Router();

const path = require('path');

const multer = require('multer');

const upload =  multer({dest : path.join(__dirname,'/upload')});

const Auth = require('../Controllers/Admin/Auth');
const Auction = require('../Controllers/Admin/Auction');
const { adminAuth } = require('../Middleware/AdminAuth');


// Authentication Routes
router.post('/signup',Auth.signUpAdmin);
router.post('/signin',Auth.signInAdmin);

router.use(adminAuth);

// Auction Routes
router.post('/create-auction',upload.single('profile'),Auction.createAuction);
router.post('/get-all-auctions',Auction.getAllAuctions);
router.post('/get-auction',Auction.getAuction);

exports.router = router;