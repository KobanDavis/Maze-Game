import React, { FC } from 'react'
import { useUser } from '../../../providers/UserProvider'
import EntitySquare from '../EntitySquare'

import styles from './index.module.less'

const Inventory: FC = () => {
	const { user } = useUser()
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>Inventory</div>
			<div className={styles.inventory}>
				{user.inventory.length ? user.inventory.map((entity, i) => <EntitySquare entity={entity} key={i} />) : null}
			</div>
		</div>
	)
}

export default Inventory
