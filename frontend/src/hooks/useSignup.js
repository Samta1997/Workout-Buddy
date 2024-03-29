import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import BASE_URI from '../helper/helper';

export const useSignup=()=>{

    const [isLoading, setIsLoading]=useState(null)
    const [error, setError]=useState(null)
    const {dispatch}=useAuthContext()

    const signup=async(email,password)=>{
        setIsLoading(true)
        setError(null)

        const response= await fetch(`${BASE_URI}api/user/signup`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        })
        const json= await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save user to local storage
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type:'LOGIN',payload:json})

            setIsLoading(false)
        }
    }

    return {signup,isLoading, error}
}