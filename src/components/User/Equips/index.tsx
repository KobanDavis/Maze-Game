import React, { FC } from 'react'
import { useUser } from '../../../providers/UserProvider'

import styles from './index.module.less'
import EntitySquare from '../EntitySquare'

const Equips: FC = () => {
	const { user } = useUser()
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>Equips</div>
			<div className={styles.equips}>
				<div className={styles.pair}>
					<div>Weapon</div>
					<EntitySquare entity={user.weapon} />
				</div>
				<div className={styles.pair}>
					<div>Helmet</div>
					<EntitySquare entity={user.armor.helmet} />
				</div>
				<div className={styles.pair}>
					<div>Chestplate</div>
					<EntitySquare entity={user.armor.chestplate} />
				</div>
				<div className={styles.pair}>
					<div>Leggings</div>
					<EntitySquare entity={user.armor.leggings} />
				</div>
				<div className={styles.pair}>
					<div>Boots</div>
					<EntitySquare entity={user.armor.boots} />
				</div>
			</div>
		</div>
	)
}

export default Equips
