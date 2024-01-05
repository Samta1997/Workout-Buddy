import React, { useEffect} from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import WorkoutDetails from '../component/WorkoutDetails';
import WorkoutForm from '../component/WorkoutForm';

const Home = () => {
    //const [workouts, setworkouts]=useState(null); initially it was used to manage state
    const {workouts, dispatch}=useWorkoutContext() //Now a global context is used
    useEffect(()=>{
        const fetchWorkouts=async()=>{
            const response=await fetch('/api/workout');
            const json=await response.json()
            if(response.ok){
                dispatch({type:"SET_WORKOUT", payload:json});//array of object because in backend response is also a json
            }
        }
        fetchWorkouts();
    },[dispatch]);
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