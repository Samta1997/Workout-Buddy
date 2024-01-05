import React, { useEffect, useState } from 'react'
import WorkoutDetails from '../component/WorkoutDetails';
import WorkoutForm from '../component/WorkoutForm';

const Home = () => {
    const [workouts, setworkouts]=useState(null);
    
    useEffect(()=>{
        const fetchWorkouts=async()=>{
            const response=await fetch('/api/workout');
            const json=await response.json()
            if(response.ok){
                setworkouts(json);//array of object because in backend response is also a json
            }
        }
        fetchWorkouts();
    },[]);
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