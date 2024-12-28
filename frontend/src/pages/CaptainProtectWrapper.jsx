import {useContext, useState}from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

const CaptainProtectedWrapper = ({
    children
}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const {captain, setCaptain} = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
    
        if(!token){
            navigate('/captain-login')
        }
    },[token])
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }}).then(response=>{
            if(response.status === 200){
                setCaptain(response.data.captain)

                setIsLoading(false)
        }}).catch(err =>{
            console.log(err)
            localStorage.removeItem('token')
            navigate('/captain-login')
        })


    if(isLoading){
        return <h1>Loading...</h1>
    }


  return (
    <>
        {children}
    </>
  )
}

export default CaptainProtectedWrapper