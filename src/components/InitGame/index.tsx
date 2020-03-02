import React, { FC, useState, useEffect } from 'react'

import styles from './index.module.less'
import TypedText from '../TypedText'
import { useGame } from '../../providers/GameProvider'
import { useUser } from '../../providers/UserProvider'

const InitGame: FC = () => {
	const { loadSavedGame, createNewGame, startGame } = useGame()
	const { loadSavedUser, createNewPlayer } = useUser()

	const [shouldFadeIn, setShouldFadeIn] = useState<boolean>(false)

	useEffect(() => {
		setTimeout(() => setShouldFadeIn(true), 2400)
	}, [])

	const handleNewGame = (): void => {
		createNewGame()
		createNewPlayer()
		startGame()
	}

	const handleSavedGame = (): void => {
		loadSavedGame()
		loadSavedUser()
		startGame()
	}

	const hasSave = localStorage.getItem('gameState') !== null

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<TypedText text={`Maze Game.\n Can you escape alive?`} speed={2} />
			</div>
			<div className={[styles.buttons, ...(shouldFadeIn ? [styles.fade] : [])].join(' ')}>
				<button className={styles.button} onClick={handleNewGame}>
					Start new game
				</button>
				{hasSave ? (
					<button className={styles.button} onClick={handleSavedGame}>
						Load saved game
					</button>
				) : null}
			</div>
		</div>
	)
}

export default InitGame
