import React, { useEffect} from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import WorkoutDetails from '../component/WorkoutDetails';
import WorkoutForm from '../component/WorkoutForm';
import { useAuthContext } from '../hooks/useAuthContext';
import BASE_URI from '../helper/helper';


const Home = () => {
    //const [workouts, setworkouts]=useState(null); initially it was used to manage state
    const {workouts, dispatch}=useWorkoutContext() //Now a global context is used
    const {user}=useAuthContext()
    
    useEffect(()=>{
        const fetchWorkouts=async()=>{
            const response=await fetch(`${BASE_URI}api/workout`,{
                headers:{
                    'authorization':`Bearer ${user.token}` 
                }
            });
            const json=await response.json()
            if(response.ok){
                dispatch({type:"SET_WORKOUT", payload:json});//array of object because in backend response is also a json
            }
        }
        if(user){
            fetchWorkouts();
        }
        
    },[dispatch,user]);
  return (
    <div className='home'>
        <div className='workout'>
            {workouts && workouts.map((workout)=>(
                <WorkoutDetails key={workout._id} workout={workout}/>
            ))}
        </div>
        <div className='workout-form'>
            {<WorkoutForm workout={workouts}/>}
        </div>
    </div>
  )
}

export default Home