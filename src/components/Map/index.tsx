import React, { FC, useState } from 'react'
import styles from './index.module.less'
import Room from './Room'
import Settings from '../Icons/Settings'
import { useGame } from '../../providers/GameProvider'
import { useUser } from '../../providers/UserProvider'
import Fight from './Fight'
import { useDialogue } from '../../providers/DialogueProvider'

const Map: FC = () => {
	const { gameState, createNewGame, startGame } = useGame()
	const { user, createNewPlayer, setPosition } = useUser()
	const { clearMessages } = useDialogue()
	const [shouldShowSettings, setShouldShowSettings] = useState<boolean>(false)
	if (!user || !user.position) return null
	const room = gameState.maze[user.position.y][user.position.x]

	const handleRestart = (e: React.MouseEvent): void => {
		if (shouldShowSettings) {
			;(e.target as HTMLButtonElement).blur()
			clearMessages()
			createNewGame()
			createNewPlayer()
			setPosition(gameState.start)
			startGame()
		}
	}

	return (
		<div className={styles.wrapper}>
			{!gameState.enemy ? <Room room={room} /> : <Fight enemy={gameState.enemy} />}
			<div className={styles.settings} onClick={(): void => setShouldShowSettings(!shouldShowSettings)}>
				<div className={[styles.icon, ...(shouldShowSettings ? [styles.spin] : [])].join(' ')}>
					<Settings />
				</div>
				<button onClick={handleRestart} className={[styles.button, ...(shouldShowSettings ? [styles.slide] : [])].join(' ')}>
					Start new game?
				</button>
			</div>
		</div>
	)
}

export default Map
