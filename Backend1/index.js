require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/userRoutes')
const proutes = require('./routes/projectRoutes')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database connected"))
.catch(err => {
    console.error('Mongo connection failed:', err)
    process.exit(1)
})

app.use("/api",routes)
app.use("/api",proutes)

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err)
    if (res.headersSent) {
        return next(err)
    }
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: err
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Server Started at ${process.env.PORT}`)
})