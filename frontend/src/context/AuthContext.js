import {createContext,useEffect,useReducer} from 'react'

export const AuthContext=createContext()


export const AuthReducer=(state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return {
                user:action.payload
            }
        case 'LOGOUT':
            return {user:null}
        default:
            return state
    }
}

export const AuthContextProvider=({children})=>{
    const[state, dispatch]=useReducer(AuthReducer,{user:null})
    console.log('Auth Context state',state);

    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type:'LOGIN',payload:user})
        }
    },[])
    

    return(
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>

    )
}