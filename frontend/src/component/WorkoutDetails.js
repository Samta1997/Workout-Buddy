import React from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { MdDeleteForever } from "react-icons/md";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = ({workout}) => {
    const {dispatch}=useWorkoutContext();
    const {user}=useAuthContext();

    const{title, reps, load, createdAt}=workout;

    const handleDelete=async()=>{
      if(!user){
        return 
      }
      const response= await fetch('/api/workout/'+ workout._id,{
        method:'DELETE',
        headers:{
          'Authorization':`Bearer ${user.token}` 
        }
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