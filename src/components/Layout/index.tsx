import React, { FC } from 'react'
import { Dialogue, Map, Minimap, User } from '..'

import styles from './index.module.less'

const Layout: FC = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<Map />
				<Dialogue />
			</div>
			<div className={styles.right}>
				<Minimap />
				<User />
			</div>
		</div>
	)
}

export default Layout
