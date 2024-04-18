import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutContext"

export const useLogout = () =>{

    const {dispatch} = useAuthContext()
    const {dispatch : workoutsDispatch} = useWorkoutsContext()



    const logout = () =>{
        //remove user from loacl storage

        localStorage.removeItem('user')

        // dispatch logout

        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type:'SET_WORKOUTS',payload:null})


    }

    return {logout}
}