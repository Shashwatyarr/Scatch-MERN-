const mongoose=require('mongoose')

mongoose.connect("mongoose://127.0.0.1:27017/scatch");

const userSchema=mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    cart:Array,
    orders:Array,
    contact:Number,
    picture:String
})

module.exports=mongoose.model("user",userSchema)