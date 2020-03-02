import React, { FC, useEffect } from 'react'

import Layout from './components/Layout'
import { useGame } from './providers/GameProvider'
import { useUser } from './providers/UserProvider'
import InitGame from './components/InitGame'
import End from './components/End'

const App: FC = () => {
	const { gameState } = useGame()
	const { user, setPosition } = useUser()
	useEffect(() => {
		if (gameState.isGameLoaded) {
			if (user.position === null) setPosition(gameState.start)
		}
	}, [gameState.isGameLoaded])

	return gameState.playerWon !== null ? <End /> : gameState.isGameLoaded ? <Layout /> : <InitGame />
}

export default App
