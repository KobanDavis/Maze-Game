import React, { FC } from 'react'
import { useUser } from '../../../providers/UserProvider'
import styles from './index.module.less'
import PlayerSprite from '../../PlayerSprite'
import HealthBar from '../../HealthBar'

const Stats: FC = () => {
	const { user } = useUser()
	if (user === null) return null
	const bonusDefence = Object.values(user.armor).reduce((a, v) => a + (v ? v.action.defence : 0), 0)
	const bonusAttack = user.weapon ? user.weapon.action.attack : 0
	return (
		<div className={styles.wrapper}>
			<div>
				<div className={styles.title}>Stats</div>
				<div className={styles.stat}>
					<span>Health:</span>
					<span>
						{user.health} / {user.maxHealth}
					</span>
				</div>
				<div className={styles.stat}>
					<span>Defence:</span>
					<span>
						{user.defence} (+{bonusDefence})
					</span>
				</div>
				<div className={styles.stat}>
					<span>Attack:</span>
					<span>
						{user.attack} (+{bonusAttack})
					</span>
				</div>
				<div className={styles.stat}>
					<span>Gold:</span>
					<span>{user.gold}g</span>
				</div>
			</div>
			<div className={styles.user}>
				<div className={styles.sprite}>
					<PlayerSprite />
				</div>
				<div className={styles.healthBar}>
					<HealthBar health={user.health} maxHealth={user.maxHealth} />
				</div>
			</div>
		</div>
	)
}

export default Stats
