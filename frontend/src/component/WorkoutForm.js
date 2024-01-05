import React, { useState } from 'react'

const WorkoutForm = () => {
    const[title, setTitle]=useState("")
    const[reps, setReps]=useState("")
    const[load, setLoad]=useState("")
    const[error, setError]=useState(null)

    const formHandler=async()=>{
        const workout={title, reps, load}
        
        const response=await fetch('api/workout', {
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            console.log('New workout added',json);
            
        }

    }

  return (
    <form className='workout-form' onSubmit={formHandler}>
        <h3>Add New Exercise</h3>
        <label>Title</label>
        <input type='text' onChange={(e)=>setTitle(e.target.value)} value={title}/>

        <label>Reps</label>
        <input type='number' onChange={(e)=>setReps(e.target.value)} value={reps}/>

        <label>Load</label>
        <input type='number' onChange={(e)=>setLoad(e.target.value)} value={load}/>

        <button>Add Workout</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm