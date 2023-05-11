import FilmLibrary from './components/FilmLibrary'
import { FilmDetail, FilmDetailEmpty } from './components/FilmDetail'
import PageNotExist from './components/PageNotExist'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FilmLibrary />}>
          <Route path=":filmId" element={<FilmDetail />}></Route>
          <Route path="" element={<FilmDetailEmpty />}></Route>
        </Route>
        <Route path="films" element={<FilmLibrary />}>
          <Route path=":filmId" element={<FilmDetail />}></Route>
          <Route path="" element={<FilmDetailEmpty />}></Route>
        </Route>
        <Route path="*" element={<PageNotExist />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
