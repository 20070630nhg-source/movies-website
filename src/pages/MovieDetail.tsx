import { useParams, Link } from 'react-router-dom'
import movies from '../movies.json'

interface Movie {
  id: number; title: string; year: number; rating: number
  director: string; genre: string[]; cast: string[]; plot: string
  poster: string; runtime: string
}

export default function MovieDetail() {
  const { id } = useParams()
  const movie = (movies as Movie[]).find(m => m.id === Number(id))

  if (!movie) {
    return (
      <div className="page">
        <div className="container" style={{ paddingTop: 80, textAlign: 'center' }}>
          <h2>Movie not found</h2>
          <Link to="/" className="back-link">← Back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="header detail-header">
        <div className="container header-inner">
          <Link to="/" className="back-btn">← Back</Link>
          <h1 className="logo">🎬 Classic Cinema</h1>
          <div />
        </div>
      </header>

      <main className="container detail">
        <div className="detail-poster">
          <img src={movie.poster} alt={movie.title} />
        </div>
        <div className="detail-info">
          <h1 className="detail-title">{movie.title} <span className="detail-year">({movie.year})</span></h1>

          <div className="detail-rating">
            <span className="rating-big">{movie.rating.toFixed(1)}</span>
            <span className="stars-big">{'★'.repeat(Math.round(movie.rating / 2))}{'☆'.repeat(5 - Math.round(movie.rating / 2))}</span>
          </div>

          <div className="detail-meta">
            <div className="meta-item"><span className="meta-label">Director</span><span>{movie.director}</span></div>
            <div className="meta-item"><span className="meta-label">Runtime</span><span>{movie.runtime}</span></div>
            <div className="meta-item"><span className="meta-label">Year</span><span>{movie.year}</span></div>
          </div>

          <div className="detail-genres">
            {movie.genre.map(g => <span key={g} className="genre-tag-lg">{g}</span>)}
          </div>

          <p className="detail-plot">{movie.plot}</p>

          <div className="detail-cast">
            <h3>Cast</h3>
            <div className="cast-list">
              {movie.cast.map((c, i) => (
                <span key={c} className="cast-item">{c}{i < movie.cast.length - 1 ? ',' : ''}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
