const express = require('express');
const router = express.Router();

const Auth = require('../Controllers/User/Auth');
const { userAuth } = require('../Middleware/UserAuth');
const Auction = require('../Controllers/User/Auction');

router.post('/signup',Auth.signUpUser);
router.post('/signin',Auth.signInUser);


router.use(userAuth);

router.post('/create-bid',Auction.createBid);
router.post('/get-all-auctions',Auction.getAllAuctions);
router.post('/get-auction',Auction.getAuction);
router.post('/get-user-auctions',Auction.getAllUserAuctions);

exports.router = router;