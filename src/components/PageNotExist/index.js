import './index.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PageNotExist() {
  const navigate = useNavigate()
  return (
    <div className='notExist'>
      <h2 className='opps'>Opps, that page doesn't exist.</h2>
      <button className='backToHome'
        onClick={() => {
          navigate('/')
        }}
      >
        Homepage
      </button>
    </div>
  )
}
