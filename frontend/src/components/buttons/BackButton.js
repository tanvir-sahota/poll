import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
    const navigate = useNavigate()
  
    const goBack = () => {
      navigate(-1)
    }
  
    return (
        <button className="material-symbols-outlined" style={{background: 'white', color: 'black', fontSize: 50}} onClick={goBack}>navigate_before</button>
    )
  }
  
  export default BackButton