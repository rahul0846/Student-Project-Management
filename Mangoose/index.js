const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/userRoutes')
const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/bharath')
.then(()=>console.log("Databse connceted"))

app.use("/api",routes)

app.listen(8000,()=>{
    console.log("Server Started")
})