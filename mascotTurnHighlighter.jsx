import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const MascotTurnHighlighter = ({ mascots, currentTurn }) => {
  const indicators = useMemo(
    () =>
      mascots.map((mascot, index) => (
        <div
          key={mascot.id}
          role="listitem"
          className={`turn-indicator${index === currentTurn ? ' active' : ''}`}
          aria-current={index === currentTurn ? 'true' : undefined}
        >
          <span className="mascot-name">{mascot.name}</span>
        </div>
      )),
    [mascots, currentTurn]
  );

  return (
    <div className="mascot-turn-highlighter" role="list">
      {indicators}
    </div>
  );
};

MascotTurnHighlighter.propTypes = {
  mascots: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  currentTurn: PropTypes.number.isRequired
};

export default React.memo(MascotTurnHighlighter);