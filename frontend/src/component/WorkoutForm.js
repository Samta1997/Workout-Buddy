import React, { useState } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'
import BASE_URI from '../helper/helper';

const WorkoutForm = () => {
    const{dispatch}=useWorkoutContext()
    const {user}=useAuthContext()
    const[title, setTitle]=useState("")
    const[reps, setReps]=useState("")
    const[load, setLoad]=useState("")
    const[error, setError]=useState(null)
    const[emptyfield, setemptyfield]=useState([])

    const formHandler=async(e)=>{
        e.preventDefault();

        if(!user){
            setError('You must be logged in')
            return
        }
        const workout={title, reps, load}
        
        const response=await fetch(`${BASE_URI}api/workout`, {
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error);
            setemptyfield(json.emptyfield)
        }
        if(response.ok){
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            setemptyfield([])
            console.log('New workout added',json);
            dispatch({type:'CREATE_WORKOUT',payload:json})
            
        }

    }

  return (
    <form className='workout-form' onSubmit={formHandler}>
        <h3>Add New Exercise</h3>
        <label>Title</label>
        <input type='text' 
        onChange={(e)=>setTitle(e.target.value)} 
        value={title} 
        className={emptyfield.includes('title') ? 'error':''}
        />

        <label>Reps</label>
        <input type='number' 
         onChange={(e)=>setReps(e.target.value)}
         value={reps} 
         className={emptyfield.includes('reps')?'error':''}
        />

        <label>Load(in kg)</label>
        <input type='number' 
        onChange={(e)=>setLoad(e.target.value)} 
        value={load} 
        className={emptyfield.includes('load')?'error':''}
        />

        <button>Add Workout</button>
        
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm