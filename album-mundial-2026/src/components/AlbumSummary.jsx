function AlbumSummary({ total, tengo, repetidas, faltan }) {
  const completionPercentage = total > 0 ? Math.round((tengo / total) * 100) : 0

  return (
    <section className="album-summary">
      <h3>Resumen del álbum</h3>
      <div className="album-summary__grid">
        <div className="album-summary__item">
          <span className="album-summary__label">Total</span>
          <strong>{total}</strong>
        </div>
        <div className="album-summary__item">
          <span className="album-summary__label">Tengo</span>
          <strong>{tengo}</strong>
        </div>
        <div className="album-summary__item">
          <span className="album-summary__label">Repetidas</span>
          <strong>{repetidas}</strong>
        </div>
        <div className="album-summary__item">
          <span className="album-summary__label">Faltan</span>
          <strong>{faltan}</strong>
        </div>
      </div>
      <p className="album-summary__completion">
        Completitud: <strong>{completionPercentage}%</strong>
      </p>
    </section>
  )
}

export default AlbumSummary
