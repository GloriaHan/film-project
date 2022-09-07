import './index.css'
import { NavLink } from 'react-router-dom'

export default function FilmRow({ film, favFilm, setFavFilm, isAll }) {
  const { title, poster_path, release_date } = film
  const url = `https://image.tmdb.org/t/p/w780${poster_path}`
  const year = new Date(release_date).getFullYear()

  return (
    <NavLink to={`/films/${film.id}`} className="FilmRow , action">
      <img src={url} alt={`${title} film poster`} />
      <div className="film-summary">
        <h3>{title}</h3>
        <p>{year}</p>
      </div>

      <button
        className="fave"
        onClick={(e) => {
          e.preventDefault()
          if (isAll) {
            setFavFilm(Array.from(new Set([...favFilm, film])))
          } else {
            const filteredFilm = [...favFilm].filter((item) => {
              return item.id !== film.id
            })
            setFavFilm(filteredFilm)
          }
        }}
      >
        <span className="material-icons">
          {isAll ? 'add_to_queue' : 'remove_from_queue'}
        </span>
      </button>
    </NavLink>
  )
}
