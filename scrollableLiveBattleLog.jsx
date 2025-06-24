import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const ScrollableLiveBattleLog = ({ logs }) => {
  const endRef = useRef(null)

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  return (
    <div
      className="scrollable-live-battle-log"
      style={{
        overflowY: 'auto',
        maxHeight: '300px',
        padding: '8px',
        backgroundColor: '#fafafa',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}
      role="log"
      aria-live="polite"
    >
      {logs.map((entry, index) => {
        const isObject = entry && typeof entry === 'object'
        const key = isObject ? entry.id : index
        const text = isObject ? entry.text : entry
        return (
          <div
            key={key}
            className="battle-log-entry"
            style={{ marginBottom: '4px' }}
          >
            {text}
          </div>
        )
      })}
      <div ref={endRef} />
    </div>
  )
}

ScrollableLiveBattleLog.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      }),
      PropTypes.string
    ])
  ).isRequired
}

ScrollableLiveBattleLog.defaultProps = {
  logs: []
}

export default ScrollableLiveBattleLog