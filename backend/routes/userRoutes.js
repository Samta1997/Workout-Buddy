const express=require('express')
const {loginUser, signupUser}=require('../controller/userController')

const router=express.Router()//instance of express router

//login route
router.post('/login',loginUser)

//signup route
router.post('/signup',signupUser)

module.exports=router