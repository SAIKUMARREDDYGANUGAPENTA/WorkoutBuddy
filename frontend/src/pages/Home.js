
import {useEffect } from 'react'

import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import {useAuthContext} from '../hooks/useAuthContext'

import WorkoutDetails from '../components/WorkoutDetails'
import Workoutform from '../components/Workoutform'


const Home = () =>{

    const {workouts,dispatch} = useWorkoutsContext()
    const {user} =useAuthContext()

    useEffect(()=>{
        const fetchworkouts = async () =>{
            const response = await fetch('/api/workouts',{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            });
            const json = await response.json();
            console.log(json)

            if(response.ok){
                dispatch({type:'SET_WORKOUTS',payload: json})
            }
            

        }

        if(user){
            fetchworkouts()
        }

        
    },[dispatch,user])

    return(
        <div className='home'>
            <div className='workouts'>
            {workouts && workouts.map((workout) => (
             workout && <WorkoutDetails key={workout._id} workout={workout} />
            ))}

                
            </div>
            <Workoutform /> 
        </div>
    )
}
export default Home