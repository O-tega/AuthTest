const express = require('express')
const dotenv = require('dotenv');
const colors = require('colors')
const connectDb = require('./config/db')

// load vars
dotenv.config({path: './config/config.env'})

// import routes
const authRoutes = require('./routes/authRoutes.routes')


app = express()

// Body parser
app.use(express.json())

// initalize database
connectDb()


// initialize routes
app.use('/api/v1/auth', authRoutes)


const PORT = 3000 || process.env.PORT



app.listen(PORT, ()=>{
   console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`.bgBlue.bold) 
})