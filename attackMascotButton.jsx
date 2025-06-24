import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

function AttackMascotButton({ attacker, defender, onAttack, isDisabled }) {
  const handleClick = useCallback(() => {
    if (isDisabled) return
    onAttack(attacker, defender)
  }, [attacker, defender, isDisabled, onAttack])

  return (
    <button
      className="attack-mascot-button"
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
    >
      Attack {defender.name}
    </button>
  )
}

AttackMascotButton.propTypes = {
  attacker: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  defender: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onAttack: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
}

AttackMascotButton.defaultProps = {
  isDisabled: false
}

export default React.memo(AttackMascotButton)