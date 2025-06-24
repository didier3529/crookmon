import React, { useEffect } from 'react'
import { useGameContext } from './gameContextProvider'
import CharacterSelection from './CharacterSelection'
import Battle from './Battle'
import WinScreen from './WinScreen'
import LossScreen from './LossScreen'
import TipJar from './TipJar'

const App = () => {
  const { state } = useGameContext()

  useEffect(() => {
    if (process.env.REACT_APP_ENABLE_ANALYTICS !== 'true') return
    const script = document.createElement('script')
    script.src = process.env.REACT_APP_ANALYTICS_URL || 'https://analytics.example.com/script.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  let content
  switch (state.stage) {
    case 'select':
      content = <CharacterSelection />
      break
    case 'battle':
      content = <Battle />
      break
    case 'win':
      content = <WinScreen />
      break
    case 'loss':
      content = <LossScreen />
      break
    case 'end':
      content = <LossScreen />
      break
    default:
      content = null
  }

  return (
    <>
      {content}
      <TipJar />
    </>
  )
}

export default App