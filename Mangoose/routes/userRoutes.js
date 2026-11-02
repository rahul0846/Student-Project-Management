const route = require('express').Router()
const {verifyToken}= require('../middleware/authMiddle')
const {login,register,dashboard} = require('../controllers/userController')

route.post('/signup',register)
route.post('/login',login)
route.get('/dashboard/:id',verifyToken,dashboard)

module.exports = route