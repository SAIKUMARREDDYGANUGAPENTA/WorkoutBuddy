import {useState} from 'react'
import {useAuthContext} from './useAuthContext'


export  const useSignup = () => {

    const [error,setError] =useState(null)
    const [isLoading,setIsloading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email,password)=>{
        setIsloading(true)
        setError(null)
        const response = await fetch('/api/user/signup',{
            method:'POST',
            headers:{'content-Type':"application/json"},
            body:JSON.stringify({email,password})
        })

        const json = await response.json()
        if(!response.ok){
            setIsloading(false)
            // console.log(json.error)
            setError(json.error)
        }

        if(response.ok){

            //save the use in the loacl storage
            localStorage.setItem("user",JSON.stringify(json))

            //update auth context
            dispatch({type:'LOGIN',payload:json})
            setIsloading(false)
            
        }
    }

    return {signup , error , isLoading}

}