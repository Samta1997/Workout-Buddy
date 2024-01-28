import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import  BASE_URI  from "../helper/helper";

export const useLogin=()=>{

    const [isLoading, setIsLoading]=useState(null)
    const [error, setError]=useState(null)
    const {dispatch}=useAuthContext()

    const login=async(email,password)=>{
        setIsLoading(true)
        setError(null)

        const response= await fetch(`${BASE_URI}api/user/login`,{
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

    return {login,isLoading, error}
}