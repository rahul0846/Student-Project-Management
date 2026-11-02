const route = require('express').Router()
const {verifyToken}= require('../middleware/authMiddle')
const {login,register,dashboard , uploadFiles , teachers, forgotPassword,resetPassword} = require('../controllers/userController')
const { upload } = require('../files/files')




route.post('/signup',register)
route.post('/login',login)
route.post("/forgot-password", forgotPassword)
route.post("/reset-password/:token", resetPassword);
route.get('/allteachers',teachers)
route.get('/dashboard/:id',verifyToken,dashboard)
route.post('/upload',upload.single("image"), uploadFiles)

module.exports = route