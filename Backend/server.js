require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const app = express()

const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')


//middlewares
app.use(express.json()) //use for post and update data
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


//routes
app.use('/api/workouts',workoutRoutes);
app.use('/api/user',userRoutes);



//Database connection

mongoose.connect(process.env.MONG_URI) //ASYNC IN NATURE it take time to do
    .then(()=>{
        console.log('connected to the database')
        //listen the requests
        app.listen(process.env.PORT,()=>{
        console.log(`http://localhost:${process.env.PORT}`)
        })
    })
    .catch((error)=>{
        console.log("error in mongoose connection")
    })


