const express = require('express');
const router = express.Router();

const Auth = require('../Controllers/Admin/Auth');

// Authentication Routes
router.post('/signup',Auth.signUpAdmin);
router.post('/signin',Auth.signInAdmin);

// Auction Routes

exports.router = router;