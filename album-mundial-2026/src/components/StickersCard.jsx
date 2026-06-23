function StickersCard({ numbers, name, group, status }) {
  const normalizedStatus = (status || 'falta').toLowerCase()

  return (
    <article className={`sticker-card sticker-card--${normalizedStatus}`}>
      <span className="sticker-card__number">{numbers}</span>
      <h3>{name}</h3>
      <p>
        <strong>Grupo:</strong> {group}
      </p>
      <span className={`sticker-card__status sticker-card__status--${normalizedStatus}`}>
        {normalizedStatus}
      </span>
    </article>
  )
}

export default StickersCard
