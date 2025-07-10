const express=require("express");
const usermodel = require("../models/usermodel");
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")
const {generateToken}=require("../utils/generatetoken")




const router=express.Router();
const {registerUser,loginUser,logout}=require("../controllers/authcontroller")

router.get("/",(req,res)=>{
    res.send("heeey")
})

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logout);

module.exports=router