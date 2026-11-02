const Users= require('../models/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});  

const SECRET= "BharathReddy"

const login = async(req,res)=>{
    const {email,password} =req.body

    if(!email || !password){
return res.status(401).json({message:"Both Email and Password Necessary"})
    }
 
try {

    const userData = await Users.findOne({email})

    if (!userData) {
    return res.status(404).json({
        message: "User not found"
    });
}
    
    const isMatch = await bcrypt.compare(req.body.password , userData.password)
    if(!isMatch){
        return res.status(401).json({
            message:"Incorrect Password"
        })
    }
    const token = jwt.sign({email:userData.email , id:userData._id},SECRET,{expiresIn:'1m'})
    // if(!email)
    // {
    //     return res.status(400).json({message:"Email Not found Please Register"})
    // }
    if(userData.role === "Teacher"){
return res.status(200).json({mesaage:"welcome Teacher",role:userData.role,id:userData._id,token})
    }
    res.status(200).json({message:"Login Sucessfull" ,role:userData.role,id:userData._id,token})
} catch (error) {
    res.status(400).json(error)
}
}

const register = async(req,res)=>{
try {
    const addUser = await Users.create(req.body)
    if (addUser.role === "Student") {

    await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: addUser.email,

        subject: "Registration Successful",

        html: `
        <div style="font-family:Arial;padding:20px;">
            <h2>Welcome ${addUser.name} 🎉</h2>

            <p>Your registration has been completed successfully.</p>

            <p>
                You can now login into Student Project Management System.
            </p>

            <hr>

            <h3>Thank You</h3>

            <p>Student Project Management System</p>
        </div>
        `

    });

}
//     const trasporter = nodemailer.createTransport({
//     host:"smtp.gmail.com",
//     port:465,
//     secure:true,
//     auth:{
//         user:"hhsgl67952@minitts.net",
//         pass:"bharatreddy"
//     },
//     tls:{
//         rejectUnauthorized:false
//     }
//    })
//    trasporter.sendMail({
//     from:"koxisaw253@disiok.com",
//     to:`${addUser.email}`,
//     subject:"Conifirming of registration",
//     text:"Registeration Sucessfull "
//    },(err)=>{
//     console.log(err)
//    })
    res.status(201).json({message:"User added Sucessfully u Can login now" , addUser})
}  catch (error) {
     console.log("========== REGISTER ERROR ==========");
     console.log(error);
     res.status(400).json(error);
 }
}

const dashboard = async(req,res)=>{
try {
    const userProfile = await Users.findById(req.params.id)
    
    res.status(200).json({name:userProfile.name , email:userProfile.email})
} catch (error) {
    res.status(400).json(error)
}
}



const forgotPassword = async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        })
    }
    try {

        const user = await Users.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "Email not found"
            })
        }
        const token = jwt.sign(
    { id: user._id },
    SECRET,
    { expiresIn: "15m" }
)

const resetLink = `http://localhost:5173/reset-password/${token}`

await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Reset Your Password",
    html: `
        <h2>Student Project Management</h2>
        <p>Click the button below to reset your password.</p>

        <a href="${resetLink}"
           style="
             background:#2563eb;
             color:white;
             padding:10px 20px;
             text-decoration:none;
             border-radius:5px;
           ">
           Reset Password
        </a>

        <p>This link will expire in 15 minutes.</p>
    `
})
        return res.status(200).json({
         message: "Password reset link sent to your email."
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }
}


const uploadFiles = async (req, res) => {
    try {
        
        
        return res.status(200).json({
            message: 'File uploaded',
            file: {
                originalName: req.file.originalname,
            }
        })
    } catch (error) {
     
        return res.status(500).json({
            message: 'Upload failed',
               error
        })
    }
}

const resetPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({
            message: "Password is required"
        });
    }

    try {

        const decoded = jwt.verify(token, SECRET);

        const hashedPassword = await bcrypt.hash(password, 10);

        await Users.findByIdAndUpdate(
            decoded.id,
            {
                password: hashedPassword
            }
        );

        return res.status(200).json({
            message: "Password Updated Successfully"
        });

    } catch (error) {

        return res.status(400).json({
            message: "Invalid or Expired Link"
        });

    }

}

const teachers = async(req,res)=>{
    try {
        const allteachers = await Users.find({
            role:"Teacher"
        })
        res.status(200).json(allteachers)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {login, register, dashboard, uploadFiles , teachers ,forgotPassword, resetPassword}