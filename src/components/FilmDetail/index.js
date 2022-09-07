import './index.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY

export function FilmDetail() {
  const [loading, setLoading] = useState(true)
  const [selectedFilm, setSelectedFilm] = useState()
  const bdURL = `https://image.tmdb.org/t/p/w1280${selectedFilm?.backdrop_path}`
  const ptURL = `https://image.tmdb.org/t/p/w780${selectedFilm?.poster_path}`
  let params = useParams()

  const fetchDetails = async () => {
    const url = `https://api.themoviedb.org/3/movie/${params.filmId}?api_key=${TMDB_API_KEY}`
    setLoading(true)
    const res = await fetch(url)
    const data = await res.json()
    setLoading(false)
    return data
  }

  useEffect(() => {
    if (params.filmId) {
      fetchDetails().then((data) => {
        setSelectedFilm(data)
        console.log(params)
      })
    }
  }, [params.filmId])

  if (!selectedFilm) return null
  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img src={bdURL} alt={`${selectedFilm.title}backdrop`} />
        <h1 className="film-title">{selectedFilm.title}</h1>
      </figure>
      <div className="film-meta">
        <p className="film-detail-overview">
          <img
            src={ptURL}
            className="film-detail-poster"
            alt={`${selectedFilm.title}poster`}
          />
          {selectedFilm.overview}
        </p>
        <p className="film-detail-tagline">{selectedFilm.tagline}</p>
      </div>
    </div>
  )
}

export function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span>No film selected</span>
      </p>
    </div>
  )
}
