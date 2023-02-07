import './index.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="header">
        <h1>WELCOME TO THE MOVIE NIGHT !</h1>
        <h2>🍿 ENJOY THE MOVIES 🍿</h2>
        <div className="toFilms">
          <Link to="/films">FILMS</Link>
        </div>
      </div>
      <div className='background'></div>
    </div>
  )
}
