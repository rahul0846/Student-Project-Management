require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/userRoutes')
const proutes = require('./routes/projectRoutes')
const cors = require('cors')
const app = express()
app.use(express.json())
const allowedOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map(origin => origin.trim())
    : ['http://localhost:5173']
app.use(cors({ origin: allowedOrigins }))

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})


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

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})