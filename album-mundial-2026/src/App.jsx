import { useEffect, useState } from 'react'
import { stickers } from './data/stickers'
import StickersCard from './components/StickersCard'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todas')
  const [stickerStates, setStickerStates] = useState(() =>
    stickers.reduce((acc, sticker) => {
      acc[sticker.id] = 'falta'
      return acc
    }, {})
  )

  const visibleStickers = stickers
    .filter((sticker) => {
      const matchesSearch =
        sticker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sticker.code.toLowerCase().includes(searchTerm.toLowerCase())

      const status = stickerStates[sticker.id] || 'falta'
      const matchesStatus =
        statusFilter === 'todas' ||
        (statusFilter === 'tengo' && status === 'tengo') ||
        (statusFilter === 'repetidas' && status === 'repetida') ||
        (statusFilter === 'faltan' && status === 'falta')

      return matchesSearch && matchesStatus
    })
    .map((sticker) => ({
      ...sticker,
      status: stickerStates[sticker.id] || 'falta',
    }))

  const handleStatusChange = (id) => {
    setStickerStates((prev) => {
      const currentStatus = prev[id] || 'falta'
      const statusOrder = ['falta', 'tengo', 'repetida']
      const currentIndex = statusOrder.indexOf(currentStatus)
      const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length]

      return {
        ...prev,
        [id]: nextStatus,
      }
    })
  }

  useEffect(() => {
    console.log(stickers)
  }, [])

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>

      <section className="sticker-section">
        <div className="sticker-section-header">
          <h2>Figuritas</h2>
          <p>
            Total visible: <strong>{visibleStickers.length}</strong> figuritas
          </p>
        </div>

        <div className="sticker-controls">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar por nombre o número"
            className="sticker-search"
          />

          <div className="sticker-filters">
            {['todas', 'tengo', 'repetidas', 'faltan'].map((filter) => (
              <button
                key={filter}
                type="button"
                className={`sticker-filter ${statusFilter === filter ? 'active' : ''}`}
                onClick={() => setStatusFilter(filter)}
              >
                {filter === 'todas'
                  ? 'Todas'
                  : filter === 'tengo'
                    ? 'Tengo'
                    : filter === 'repetidas'
                      ? 'Repetidas'
                      : 'Faltan'}
              </button>
            ))}
          </div>
        </div>

        <div className="sticker-grid">
          {visibleStickers.map((sticker) => (
            <StickersCard
              key={sticker.id}
              id={sticker.id}
              numbers={sticker.code}
              name={sticker.name}
              group={sticker.group ?? sticker.section}
              status={sticker.status}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </section>

      <section id="spacer"></section>
    </>
  )
}

export default App
