import React, { FC, useEffect, useState } from 'react'

import PlayerSprite from '../../PlayerSprite'
import { useUser } from '../../../providers/UserProvider'
import FadeText from '../../FadeText'
import { useGame } from '../../../providers/GameProvider'
import { useDialogue } from '../../../providers/DialogueProvider'
import floor from '../../../assets/floor.png'

import styles from './index.module.less'
import { Entity, Stats } from '../../../types'
import HealthBar from '../../HealthBar'

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
		const calculateDamage = (a: number, d: number): number => Math.round(a * (1 - (d / 100) * 4))
		const fight = async (): Promise<void> => {
			if (props.enemy) {
				await sleep(1000)
				if (user.health <= 0) {
					endGame(false)
				} else if (props.enemy.action.health <= 0) {
					endFight()
					sendMessage('You won the fight!')
					sendMessage(`The ${props.enemy.name} was slain!`)
					sendMessage(`The ${props.enemy.name} dropped ${props.enemy.action.gold}g!`)
					addGold(props.enemy.action.gold)
				} else {
					if (turn % 2 === 0) {
						let { attack } = user
						if (user.weapon) attack += user.weapon.action.attack
						const damage = calculateDamage(attack, props.enemy.action.defence)
						setUserDamageTaken(null)
						setEnemyDamageTaken(damage > 0 ? damage : 0)
						attackEnemy(damage)
					} else {
						const damage = calculateDamage(
							gameState.enemy.action.attack,
							Object.values(user.armor).reduce<number>((a, v) => a + (v ? v.action.defence : 0), 0)
						)
						setEnemyDamageTaken(null)
						setUserDamageTaken(damage > 0 ? damage : 0)
						attackPlayer(damage)
					}
					setTurn(turn + 1)
				}
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
				<HealthBar health={user.health} maxHealth={user.maxHealth} withText={true} />
				<div className={styles.userDamageTaken}>{userDamageTaken !== null ? <FadeText text={`-${userDamageTaken}`} /> : null}</div>
			</div>
			<div className={styles.enemy}>
				<div className={styles.enemySprite} style={{ backgroundImage: `url(${props.enemy.image})` }} />
				<HealthBar health={props.enemy.action.health} maxHealth={props.enemy.action.maxHealth} withText={true} />
				<div className={styles.enemyDamageTaken}>{enemyDamageTaken !== null ? <FadeText text={`-${enemyDamageTaken}`} /> : null}</div>
			</div>
		</div>
	)
}

export default Fight
