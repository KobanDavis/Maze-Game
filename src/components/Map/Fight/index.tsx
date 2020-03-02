import React, { FC, useEffect, useState } from 'react'

import PlayerSprite from '../../PlayerSprite'
import { useUser } from '../../../providers/UserProvider'
import FadeText from '../../FadeText'
import { useGame } from '../../../providers/GameProvider'
import { useDialogue } from '../../../providers/DialogueProvider'
import floor from '../../../assets/floor.png'

import styles from './index.module.less'
import { Entity, Stats } from '../../../types'

interface FightProps {
	enemy: Entity<Stats>
}

const Fight: FC<FightProps> = props => {
	const { user, attackPlayer, addGold } = useUser()
	const { endFight, attackEnemy, gameState, endGame } = useGame()
	const { sendMessage } = useDialogue()

	const [enemyDamageTaken, setEnemyDamageTaken] = useState<number>(null)
	const [userDamageTaken, setUserDamageTaken] = useState<number>(null)
	const [turn, setTurn] = useState<number>(0)

	useEffect(() => {
		const sleep = async (t: number): Promise<void> => new Promise(r => setTimeout(r, t))

		const fight = async (): Promise<void> => {
			if (props.enemy) {
				if (turn % 2 === 0) {
					let damage = user.attack - Math.round(gameState.enemy.action.defence / 2)
					if (user.weapon) damage += user.weapon.action.attack
					await sleep(1000)
					setUserDamageTaken(null)
					setEnemyDamageTaken(damage > 0 ? damage : 0)
					attackEnemy(damage)
				} else {
					let damage = gameState.enemy.action.attack
					damage -= Math.round(Object.values(user.armor).reduce<number>((a, v) => (a += v ? v.action.defence : 0), 0)) / 2
					await sleep(1000)
					setEnemyDamageTaken(null)
					setUserDamageTaken(damage > 0 ? damage : 0)
					attackPlayer(damage)
				}
				if (user.health <= 0) {
					await sleep(1000)
					sendMessage('You were slain!')
					endGame(false)
				} else if (props.enemy.action.health <= 0) {
					await sleep(1000)
					endFight()
					sendMessage('You won the fight!')
					sendMessage(`The ${props.enemy.name} was slain!`)
					sendMessage(`The ${props.enemy.name} dropped ${props.enemy.action.gold}g!`)
					addGold(props.enemy.action.gold)
				} else setTurn(turn + 1)
			}
		}
		fight()
	}, [turn])

	return (
		<div
			className={styles.wrapper}
			style={{
				backgroundImage: `url(${floor})`
			}}
		>
			<div className={styles.player}>
				<PlayerSprite />
				<div>
					{user.health} / {user.maxHealth}
				</div>
				<div className={styles.userDamageTaken}>{userDamageTaken !== null ? <FadeText text={`-${userDamageTaken}`} /> : null}</div>
			</div>
			<div className={styles.enemy}>
				<div className={styles.enemySprite} style={{ backgroundImage: `url(${props.enemy.image})` }} />
				<div className={styles.enemyDamageTaken}>{enemyDamageTaken !== null ? <FadeText text={`-${enemyDamageTaken}`} /> : null}</div>
				<div>
					{props.enemy.action.health} / {props.enemy.action.maxHealth}
				</div>
			</div>
		</div>
	)
}

export default Fight
