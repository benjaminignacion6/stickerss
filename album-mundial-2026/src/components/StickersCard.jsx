function StickersCard({ id, numbers, name, group, status, onStatusChange }) {
  const normalizedStatus = (status || 'falta').toLowerCase()

  const cardStyle = {
    cursor: 'pointer',
    backgroundColor:
      normalizedStatus === 'tengo'
        ? '#dff7e8'
        : normalizedStatus === 'repetida'
          ? '#fff6d6'
          : '#e9ecef',
    borderColor:
      normalizedStatus === 'tengo'
        ? '#5ecf80'
        : normalizedStatus === 'repetida'
          ? '#f3c13a'
          : '#8f99a4',
  }

  const badgeStyle = {
    backgroundColor:
      normalizedStatus === 'tengo'
        ? '#5ecf80'
        : normalizedStatus === 'repetida'
          ? '#f3c13a'
          : '#8f99a4',
    color: normalizedStatus === 'repetida' ? '#222' : '#fff',
  }

  return (
    <article
      className={`sticker-card sticker-card--${normalizedStatus}`}
      onClick={() => onStatusChange?.(id)}
      style={cardStyle}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onStatusChange?.(id)
        }
      }}
    >
      <span className="sticker-card__number">{numbers}</span>
      <h3>{name}</h3>
      <p>
        <strong>Grupo:</strong> {group}
      </p>
      <span className={`sticker-card__status sticker-card__status--${normalizedStatus}`} style={badgeStyle}>
        {normalizedStatus}
      </span>
    </article>
  )
}

export default StickersCard
