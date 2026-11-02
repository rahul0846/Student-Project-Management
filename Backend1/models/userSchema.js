const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

userSchema.pre("save", async function (){
try {
    if(!this.isModified("password")){
   return
}
this.password = await bcrypt.hash(this.password , 10)
} catch (error) {
    console.log(error)
    throw error
}

})

module.exports =mongoose.model("User" , userSchema)