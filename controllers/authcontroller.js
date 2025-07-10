const productmodel = require("../models/productmodel"); // make sure this is imported
const usermodel = require("../models/usermodel");
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")
const cookie=require("cookie-parser");
const {generateToken}=require("../utils/generatetoken")


module.exports.registerUser=async (req,res)=>{
    try{let {email,password,fullname}=req.body
    
    let user=await usermodel.findOne({email:email});
    if(user) {req.flash("error","You Already have an account please login")
        return res.redirect("/")
    }

    bcrypt.genSalt(10,async function(err,salt){
        bcrypt.hash(password,salt,async function(err,hash){
            if(err){ return res.send(err.message)}
                else{
            let createduser =await usermodel.create({
            email,
            password:hash,
            fullname
         })
         let token=generateToken(createduser);
         res.cookie("token",token);
          const products = await productmodel.find();
            res.render("shop", { products ,success:[]});
        }
        })
    })

}
catch(err){
    res.send(err.message)
}
}

module.exports.loginUser=async function(req,res) {
    let {email,password,fullname}=req.body;

    let user=await usermodel.findOne({email:email});
    if(!user) {req.flash("error","Email or password incorrect");
        res.redirect("/");
    }
    bcrypt.compare(password,user.password,async function(err,result){
        if(result){
            let token=generateToken(user);
            res.cookie("token", token)
            const products = await productmodel.find();
            res.render("shop", { products,success:[] });
        }
        else{
            req.flash("error","Email or password incorrect");
            res.redirect("/")
        }
    })
}

module.exports.logout=function(req,res){
    res.cookie("token","");
    res.redirect("/")
}
