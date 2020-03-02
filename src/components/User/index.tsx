import React, { FC } from 'react'
import styles from './index.module.less'
import Stats from './Stats'
import Equips from './Equips'
import Inventory from './Inventory'

const User: FC = () => {
	return (
		<div className={styles.wrapper}>
			<Stats />
			<div className={styles.row}>
				<Inventory />
				<Equips />
			</div>
		</div>
	)
}

export default User
