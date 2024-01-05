import React from 'react'

const WorkoutDetails = ({workout}) => {
    const{title, reps, load}=workout;

  return (
    <div className='workout-details'>
        <h4>Title: {title}</h4>
        <p>Load(in kg): {load}</p>
        <p>Reps:{reps}</p>
        <p>{workout.createdAt}</p>
    </div>
   
  )
}

export default WorkoutDetails