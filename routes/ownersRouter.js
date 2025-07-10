const express=require("express")

const router=express.Router();
//const owner=require("../models/ownermodel");
const ownermodel = require("../models/ownermodel");

router.get("/",(req,res)=>{
    res.send("heeey")
})

if(process.env.NODE_ENV==='development'){
    router.post("/create",async function(req,res){
        let owners=await ownermodel.find();
        if(owners.length>0) {return res.status(501).send('your dont have permission to create a new owner')}
        let {fullname,email,password}=req.body;
        let createdowner=await  ownermodel.create({
                fullname,email,password
        })
            res.status(201).send(createdowner);
    })
}

router.get("/admin",function(req,res){
    let success=req.flash("success")
    res.render("createproducts",{success});
})
module.exports=router