const jwt=require("jsonwebtoken")

const generateToken=(createduser)=>{
    return jwt.sign({email:createduser.email,id:createduser._id},process.env.JWT_KEY);
}

module.exports.generateToken=generateToken;