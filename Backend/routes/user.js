const express = require('express');

const  {userlogin,usersignup} =require("../controllers/UserController")

const router = express.Router()


//login route

router.post('/login', userlogin)

//signup

router.post('/signup',usersignup)


module.exports = router