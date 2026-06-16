import movies from '../movies.json'
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

interface Movie {
  id: number; title: string; year: number; rating: number
  director: string; genre: string[]; cast: string[]; plot: string
  poster: string; runtime: string
}

function StarRating({ rating }: { rating: number }) {
  const stars = Math.round(rating / 2)
  return (
    <span className="stars">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</span>
  )
}

export default function HomePage() {
  const [query, setQuery] = useState('')
  const data = movies as Movie[]

  const filtered = useMemo(() => {
    if (!query.trim()) return data
    const q = query.toLowerCase()
    return data.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.director.toLowerCase().includes(q) ||
      m.genre.some(g => g.toLowerCase().includes(q))
    )
  }, [query, data])

  return (
    <div className="page">
      <header className="header">
        <div className="container header-inner">
          <h1 className="logo">🎬 Classic Cinema</h1>
          <div className="search-wrap">
            <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              className="search-input"
              type="text"
              placeholder="Search by title, director, or genre..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery('')}>✕</button>
            )}
          </div>
        </div>
      </header>

      <main className="container">
        <p className="result-count">
          {filtered.length === data.length
            ? `Showing all ${data.length} classics`
            : `Found ${filtered.length} result${filtered.length !== 1 ? 's' : ''}`}
        </p>
        <div className="grid">
          {filtered.map(m => (
            <Link to={`/movie/${m.id}`} key={m.id} className="card">
              <div className="card-poster">
                <img src={m.poster} alt={m.title} loading="lazy" />
              </div>
              <div className="card-body">
                <h3 className="card-title">{m.title}</h3>
                <div className="card-meta">
                  <span className="rating">{m.rating.toFixed(1)}</span>
                  <StarRating rating={m.rating} />
                  <span className="year">{m.year}</span>
                </div>
                <div className="card-genres">
                  {m.genre.map(g => <span key={g} className="genre-tag">{g}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="empty">
            <p>No movies found for "<strong>{query}</strong>"</p>
          </div>
        )}
      </main>
    </div>
  )
}
