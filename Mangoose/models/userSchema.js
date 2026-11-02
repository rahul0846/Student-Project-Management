const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    password:{
        type:String,
        required:true,
    
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Teacher" , "Student"],
        default:"Student",
        required:true
    }
})

module.exports =mongoose.model("User" , userSchema)