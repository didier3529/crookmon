import React, { createContext, useReducer, useContext, useMemo } from 'react'
import { initializeGame, performAttack, endGame } from './gameMechanics'

const initialState = {
  stage: 'select',
  selectedA: null,
  selectedB: null,
  hp: {},
  log: [],
  turn: 'A'
}

const GameContext = createContext()

function gameReducer(state, action) {
  switch (action.type) {
    case 'INIT_GAME': {
      const { hp, log } = initializeGame(action.payload)
      return {
        ...state,
        hp,
        log
      }
    }
    case 'PERFORM_ATTACK': {
      const { selectedA, selectedB, turn } = state
      const attacker = turn === 'A' ? selectedA : selectedB
      const defender = turn === 'A' ? selectedB : selectedA
      let nextState = performAttack(state, attacker, defender)
      if (nextState.hp.A <= 0 || nextState.hp.B <= 0) {
        return endGame(nextState)
      }
      return nextState
    }
    case 'END_GAME':
      return endGame(state)
    case 'RESET_GAME':
      return {
        ...initialState,
        hp: { ...initialState.hp },
        log: [...initialState.log]
      }
    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const value = useMemo(() => ({ state, dispatch }), [state])
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider')
  }
  return context
}