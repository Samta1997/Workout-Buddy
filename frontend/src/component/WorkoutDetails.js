import React from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { MdDeleteForever } from "react-icons/md";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => {
    const {dispatch}=useWorkoutContext();
    const{title, reps, load, createdAt}=workout;
    const handleDelete=async()=>{
      const response= await fetch('/api/workout/'+ workout._id,{
        method:'DELETE'
      })
      const json= await response.json()
      if(response.ok){
        dispatch({type:"DELETE_WORKOUT",payload:json})
      }
    }

  return (
    <div className='workout-details'>
        <h4>Title: {title}</h4>
        <p><strong>Load(in kg):</strong> {load}</p>
        <p><strong>Reps:</strong>{reps}</p>
        <p>{formatDistanceToNow(new Date(createdAt),{addSuffix:true})}</p>
        <span onClick={handleDelete}><MdDeleteForever /></span>
    </div>
   
  )
}

export default WorkoutDetails