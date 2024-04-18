const mongoose = require('mongoose');

const Schema = mongoose.Schema


const workoutSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    reps:{
        type:Number,
        required:true
    },
    load :{
        type:Number,
        required:true
    },
    user_id :{
        type:String,
        required:true
    }
},{timestamps:true}) //add time in database if anyting add or update in database

module.exports = mongoose.model('workout',workoutSchema)  //export the model so it can be used by other files

