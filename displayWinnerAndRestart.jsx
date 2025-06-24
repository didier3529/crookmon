import React from 'react';
import { useGameContext } from '../gameContextProvider';
import RestartButton from './RestartButton';

const DisplayWinnerAndRestart = () => {
  const { state } = useGameContext() || {};
  if (!state || !state.hp || !state.selectedA || !state.selectedB) {
    return null;
  }

  const { hp, selectedA, selectedB } = state;
  const hpA = hp[selectedA];
  const hpB = hp[selectedB];

  if (hpA > 0 && hpB > 0) {
    return null;
  }

  let message;
  if (hpA <= 0 && hpB <= 0) {
    message = "It's a tie!";
  } else if (hpA <= 0) {
    message = `Player ${selectedB} wins!`;
  } else {
    message = `Player ${selectedA} wins!`;
  }

  return (
    <div className="winner-container">
      <p className="winner-message">{message}</p>
      <RestartButton />
    </div>
  );
};

export default DisplayWinnerAndRestart;