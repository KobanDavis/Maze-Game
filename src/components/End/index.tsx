import React, { FC, useState, useEffect } from 'react'

import styles from './index.module.less'
import TypedText from '../TypedText'
import { useGame } from '../../providers/GameProvider'
import { useUser } from '../../providers/UserProvider'
import { useDialogue } from '../../providers/DialogueProvider'

const End: FC = () => {
	const { createNewGame, startGame, gameState } = useGame()
	const { user, createNewPlayer, setPosition } = useUser()
	const { clearMessages } = useDialogue()
	const [shouldFadeIn, setShouldFadeIn] = useState<boolean>(false)

	useEffect(() => {
		setTimeout(() => setShouldFadeIn(true), 3200)
	}, [])

	const handleNewGame = (): void => {
		createNewGame()
		createNewPlayer()
		setPosition(gameState.start)
		clearMessages()
		startGame()
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				{gameState.playerWon ? (
					<TypedText text={`You escaped the maze!\n You escaped with ${user.gold} gold.`} speed={2} />
				) : (
					<TypedText text={`You died to the ${gameState.enemy.name}.\n Better luck next time.`} speed={2} />
				)}
			</div>
			<div className={[styles.buttons, ...(shouldFadeIn ? [styles.fade] : [])].join(' ')}>
				<button className={styles.button} onClick={handleNewGame}>
					Play again?
				</button>
			</div>
		</div>
	)
}

export default End
