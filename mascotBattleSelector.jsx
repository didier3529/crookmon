function MascotBattleSelector() {
  const { state, dispatch } = useContext(BattleContext)
  const { selectedMascots } = state

  const handleSelect = mascot => {
    dispatch({ type: 'SELECT_MASCOT', payload: mascot })
  }

  const bothSelected = selectedMascots.length === 2

  return (
    <div className="mascot-battle-selector">
      <div className="mascots-grid">
        {mascots.map(mascot => (
          <MascotCard
            key={mascot.id}
            mascot={mascot}
            isSelected={selectedMascots.some(selected => selected.id === mascot.id)}
            onSelect={() => handleSelect(mascot)}
          />
        ))}
      </div>
      <StartBattleButton disabled={!bothSelected} />
    </div>
  )
}

export default MascotBattleSelector