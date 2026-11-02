const jwt = require('jsonwebtoken')
const SECRET= "BharathReddy"

const verifyToken =(req,res,next)=>{
const authHeader = req.headers.Authorization || req.headers.authorization

if(!authHeader){
return res.status(401).json({message:"Un Authorized"})
}

const token = authHeader.split(" ")[1]

try {
    const payload = jwt.verify(token ,SECRET)
    req.user = payload
    next()
} catch (error) {
    res.status(400).json({message:"Inavlid Token"})
}
}

module.exports ={verifyToken}