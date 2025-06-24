import React from 'react';
import PropTypes from 'prop-types';

function SelectableMascotCard({ name, imageURL, selected, onSelect }) {
  const handleClick = () => {
    onSelect(name);
  };

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={handleClick}
      className={`mascot-card${selected ? ' selected' : ''}`}
    >
      <img src={imageURL} alt={name} />
      <p>{name}</p>
    </button>
  );
}

SelectableMascotCard.propTypes = {
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

SelectableMascotCard.defaultProps = {
  selected: false,
};

export default SelectableMascotCard;