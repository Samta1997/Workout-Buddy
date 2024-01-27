import { useAuthContext } from "./useAuthContext"
import {useWorkoutContext} from "./useWorkoutContext"

export const useLogout=()=>{
    const {dispatch}=useAuthContext()
    const {dispatch:workoutdispatch}=useWorkoutContext()

    const logout=async()=>{
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
        workoutdispatch({type:'SET_WORKOUT',payload:null})
    }
    return {logout}
}