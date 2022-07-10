//app gives us access to all the variables express has to offer 

const express = require('express')
const dbConnect = require("./config/dbConnect")
const dotenv=require("dotenv")
const { userRegisterCtrl } = require('./controllers/user/userContrl')
const userRouter = require('./routes/user/UserRoute')
const { errorHandler,  notFound } = require('./middleware/error/errorHandler')
dotenv.config()
errorHandler
const app = express()


// DB
dbConnect()
//Middle ware
app.use(express.json())

// custome middle ware
const logger = (req,res,next) =>{
  console.log("am a logger")
  next()
}



app.use(logger)
// /register

//user route
app.use('/api/users', userRouter)

//errr
app.use( notFound)
app.use(  errorHandler)
const PORT  = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})