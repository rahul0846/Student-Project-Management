const Users= require('../models/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SECRET= "BharathReddy"

const login = async(req,res)=>{
    const {email,password} =req.body

    if(!email || !password){
return res.status(401).json({message:"Both Email and Password Necessary"})
    }

try {
 v                                                                                                                                             
    const userData = await Users.findOne({email})
    
    const isMatch = await bcrypt.compare(req.body.password , userData.password)
    if(!isMatch){
        return res.status(400).json("Password missmatch")
    }
    const token = jwt.sign({email:userData.email , id:userData._id},SECRET,{expiresIn:'1m'})
    if(!email)
    {
        return res.status(400).json({message:"Email Not found Please Register"})
    }
    if(userData.role === "Teacher"){
return res.status(200).json({mesaage:"welcome Teacher",userData,token})
    }
    res.status(200).json({message:"Login Sucessfull" ,userData,token})
} catch (error) {
    res.status(400).json(error)
}
}

const register = async(req,res)=>{
try {
    const addUser = await Users.create(req.body)
    res.status(201).json({message:"User added Sucessfully u Can login now" , addUser})
} catch (error) {
    res.status(400).json(error)
}
}

const dashboard = async(req,res)=>{
    const uploadFiles=(upload.single("large"),async)

try {
    const userProfile = await Users.findById(req.params.id)
    res.status(200).json({message:`${userProfile.name} - ${userProfile.role}`})
} catch (error) {
    res.status(400).json(error)
}
}


module.exports = {login,register , dashboard }