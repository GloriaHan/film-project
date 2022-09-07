import './index.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="header">
        <h2>WELCOME TO THE MOVIE NIGHT !</h2>
        <h3>🍿 ENJOY THE MOVIES 🍿</h3>
        <div className="toFilms">
          <Link to="/films">FILMS</Link>
        </div>
      </div>
      <div className='background'></div>
    </div>
  )
}
