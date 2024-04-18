const Workout = require('../models/Workoutmodel');

const mongoose = require('mongoose')




// get all workouts

const getWorkourts = async (req,res)=>{
    const user_id = req.user._id
    try{
        const workouts = await Workout.find({user_id}).sort({createdAt:-1})
        res.status(200).json(workouts)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
 

//get a single workout 

const getsingleworkout = async (req,res)=>{
    const { id } =req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }

    try{

        const workout = await Workout.findById(id)

        if(!workout){
          return  res.status(404).json({error:'No workout found'})
        }

        res.status(200).json(workout)

    }catch(error){
        res.status(400).json({error:error.message})
    }
}
 
// create new workout

const createWorkout = async (req,res) =>{
    const {title,reps,load}=req.body
    let emptyFields =[]
    if( !title || title.trim()===''){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0 ){
        return res.status(400).json({ error:'please fill all the fields',emptyFields })
    }

    try{
        const user_id = req.user._id
        const workout = await Workout.create({
            title, reps, load ,user_id
        })
        
        res.status(200).json(workout)

    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//Delete workout

const deleteworkout = async (req,res)=>{
    const { id  }= req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No workout is find'})
    }
    try{
        const delwork = await Workout.findOneAndDelete({_id:id})
        if(!delwork){
            return res.status(404).json({error:'No workout is find'})
        }
        res.status(200).json(delwork)
    }catch(error){
        res.status(400).json(error.message)
    }
}


// Update workout
const updateWorkout = async (req,res)=>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No workout is find'})
    }
    try{

        const workout = await Workout.findOneAndUpdate({_id:id},{
            ...req.body
        })
        if(!workout){
            return res.status(404).json({error:'No workout is find'})
        }

        res.status(200).json(workout)

    }catch(error){
        res.status(400).json(error.message)
    }

}




module.exports = {
    createWorkout,
    getWorkourts,
    getsingleworkout,
    deleteworkout,
    updateWorkout
}