import { FilmDetail, FilmDetailEmpty } from '../FilmDetail'
import React, { useEffect, useState } from 'react'
import './index.css'
import '../FilmRow/index.css'
import FilmRow from '../FilmRow'
import { Outlet, useNavigate } from 'react-router-dom'

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY

function FilmLibrary() {
  const [favFilm, setFavFilm] = useState([])
  const [isActive, setIsActive] = useState(true)
  const [movieRaw, setMovieRaw] = useState([])
  const [page, setPage] = useState(1)
  const [releaseYear, setReleaseYear] = useState(2023)
  const [yearValue, setYearValue] = useState()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchMoives = async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&primary_release_year=${releaseYear}`
    setLoading(true)
    const res = await fetch(url)
    const data = await res.json()
    setLoading(false)
    return data
  }

  useEffect(() => {
    if (page > 1) {
      fetchMoives().then((response) => {
        setMovieRaw([...movieRaw, ...response.results])
      })
      console.log(movieRaw)
    }
  }, [page])

  useEffect(() => {
    fetchMoives().then((response) => {
      setMovieRaw(response.results)
    })
  }, [releaseYear])

  const enterChange = (e) => {
    if (e.keyCode === 13) {
      setReleaseYear(yearValue)
      navigate('/films')
      setPage(1)
    }
  }

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>

        <div className="film-list-filters">
          <button
            className={`film-list-filter ${isActive ? 'is-active' : null}`}
            onClick={() => {
              setIsActive(true)
            }}
          >
            TOP
            <span className="section-count">{movieRaw.length}</span>
          </button>

          <button
            className={`film-list-filter ${!isActive ? 'is-active' : null}`}
            onClick={() => {
              setIsActive(false)
            }}
          >
            FAVES
            <span className="section-count">{favFilm.length}</span>
          </button>
        </div>
        <span>
          <input
            className="input"
            type="number"
            onChange={(e) => setYearValue(e.target.value)}
            onKeyUp={(e) => enterChange(e)}
            placeholder="search by release year e.g. 2000"
          ></input>
          <button
            onClick={() => {
              navigate('/films')
              setReleaseYear(yearValue)
              setPage(1)
            }}
          >
            search
          </button>
        </span>
        {isActive == true ? (
          <>
            {movieRaw.map((film) => (
              <FilmRow
                key={film.id}
                film={film}
                favFilm={favFilm}
                isAll={isActive}
                setFavFilm={setFavFilm}
              />
            ))}
            <button
              className="section-loading"
              onClick={() => setPage(page + 1)}
            >
              loading more
            </button>
          </>
        ) : (
          <>
            {favFilm.map((film) => (
              <FilmRow
                key={film.id}
                film={film}
                favFilm={favFilm}
                isAll={isActive}
                setFavFilm={setFavFilm}
              />
            ))}
          </>
        )}
      </div>
      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        <Outlet />
      </div>
    </div>
  )
}

export default FilmLibrary
