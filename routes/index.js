const express=require("express")
const router=express.Router()
const isLoggedIn=require("../middleware/isLoggenIn");
const productmodel = require("../models/productmodel");
const usermodel = require("../models/usermodel");

router.get("/",(req,res)=>{
    let error=req.flash("error");
    res.render("index",{error,loggedin:false});
})

router.get("/shop",isLoggedIn,async function(req,res){
    let products=await productmodel.find()
    let success=req.flash("success");
    res.render("shop", { products: products,success });

});

router.get("/cart",isLoggedIn,async function(req,res){
    let user=await usermodel.findOne({email:req.user.email}).populate("cart")
    res.render("cart",{user})

});


router.get("/addtocart/:id",isLoggedIn,async function(req,res){
    let user=await usermodel.findOne({email:req.user.email})
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success","Added to your cart");
    res.redirect("/shop")
});


router.get("/logout",isLoggedIn,function(req,res){
    res.render("shop")
});

module.exports=router;