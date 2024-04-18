const express = require('express');
const router = express.Router();
const Workout = require('../models/Workoutmodel')
const {createWorkout ,getWorkourts,getsingleworkout,deleteworkout,updateWorkout } = require('../controllers/workoutcontrollers')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//get all workouts
router.get('/',getWorkourts)

//Get a single workout

router.get('/:id',getsingleworkout)
 

//post a new workout
router.post('/',createWorkout)

//Delete a workout
router.delete('/:id',deleteworkout)


//update a workout

router.patch('/:id',updateWorkout)

module.exports = router