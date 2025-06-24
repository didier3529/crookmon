import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const SET_TURN = 'SET_TURN';
const PLAYER_TAKE_DAMAGE = 'PLAYER_TAKE_DAMAGE';
const ADD_LOG = 'ADD_LOG';

const AiTurnHandler = ({ state, dispatch }) => {
  const { aiMon, playerMon, turn } = state;

  useEffect(() => {
    if (turn !== 'ai' || !aiMon || !playerMon) return;

    const timer = setTimeout(() => {
      const attacks = aiMon.attacks || [];
      if (attacks.length === 0) {
        dispatch({ type: SET_TURN, payload: 'player' });
        return;
      }
      const attack = attacks[Math.floor(Math.random() * attacks.length)];
      const damage = attack.damage || 0;

      dispatch({ type: PLAYER_TAKE_DAMAGE, payload: damage });
      dispatch({
        type: ADD_LOG,
        payload: `${aiMon.name} used ${attack.name} and dealt ${damage} damage!`
      });
      dispatch({ type: SET_TURN, payload: 'player' });
    }, 1000);

    return () => clearTimeout(timer);
  }, [turn, aiMon, playerMon, dispatch]);

  return null;
};

AiTurnHandler.propTypes = {
  state: PropTypes.shape({
    aiMon: PropTypes.shape({
      name: PropTypes.string.isRequired,
      attacks: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          damage: PropTypes.number
        })
      )
    }),
    playerMon: PropTypes.object,
    turn: PropTypes.string.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default AiTurnHandler;