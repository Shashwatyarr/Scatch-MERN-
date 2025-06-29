const mongoose=require('mongoose')

const ownerSchema=mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    cart:Array,
    products:Array,
    picture:String,
    gstin:String
})

module.exports=mongoose.model("owner",ownerSchema)