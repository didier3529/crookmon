import React, { useCallback } from 'react'
import { useGameContext } from './gameContextProvider'
import AccessibleHpBar from './accessibleHpBar'
import AttackMascotButton from './attackMascotButton'
import MascotTurnHighlighter from './mascotTurnHighlighter'
import ScrollableLiveBattleLog from './scrollableLiveBattleLog'

function DisplayBattleInterface() {
  const { state, dispatch } = useGameContext()
  const { selectedA, selectedB, turn, hp, log } = state

  if (!selectedA || !selectedB || !hp) return null

  const attacker = turn === 'A' ? selectedA : selectedB
  const defender = turn === 'A' ? selectedB : selectedA
  const attacks = attacker.attacks ?? []

  const handlePerformAttack = useCallback(
    attack => {
      dispatch({
        type: 'PERFORM_ATTACK',
        payload: { attack, attacker, defender }
      })
    },
    [dispatch, attacker, defender]
  )

  return (
    <div className="battle-interface">
      <div className="hp-bars">
        {Object.entries(hp).map(([mascotId, currentHp]) => {
          const maxHp = mascotId === selectedA.id
            ? selectedA.maxHp
            : selectedB.maxHp
          return (
            <AccessibleHpBar
              key={mascotId}
              player={mascotId}
              hp={currentHp}
              max={maxHp}
            />
          )
        })}
      </div>
      <MascotTurnHighlighter turn={turn} />
      <div className="attack-buttons">
        {attacks.map(attack => (
          <AttackMascotButton
            key={attack.id}
            attack={attack}
            onClick={() => handlePerformAttack(attack)}
          />
        ))}
      </div>
      <ScrollableLiveBattleLog entries={log} />
    </div>
  )
}

export default DisplayBattleInterface