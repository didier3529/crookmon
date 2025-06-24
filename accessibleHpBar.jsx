import React from 'react';
import PropTypes from 'prop-types';

const AccessibleHpBar = ({
  currentHP,
  maxHP,
  label,
  className,
  style,
  ...rest
}) => {
  const safeCurrentHP = Math.max(0, Math.min(currentHP, maxHP));
  const percentage = maxHP > 0 ? (safeCurrentHP / maxHP) * 100 : 0;

  let barColor = '#4caf50';
  if (percentage <= 25) barColor = '#f44336';
  else if (percentage <= 50) barColor = '#ffeb3b';

  const containerStyle = {
    backgroundColor: '#ddd',
    borderRadius: '4px',
    position: 'relative',
    overflow: 'hidden',
    height: '1em',
    width: '100%',
    ...style,
  };

  const fillerStyle = {
    width: `${percentage}%`,
    backgroundColor: barColor,
    height: '100%',
    transition: 'width 0.3s ease',
  };

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={maxHP}
      aria-valuenow={safeCurrentHP}
      aria-valuetext={`${safeCurrentHP} of ${maxHP} HP`}
      className={className}
      style={containerStyle}
      {...rest}
    >
      <div style={fillerStyle} />
    </div>
  );
};

AccessibleHpBar.propTypes = {
  currentHP: PropTypes.number.isRequired,
  maxHP: PropTypes.number.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

AccessibleHpBar.defaultProps = {
  label: 'HP',
  className: '',
  style: {},
};

export default AccessibleHpBar;