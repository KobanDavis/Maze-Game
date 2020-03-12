import React, { FC } from 'react'

import styles from './index.module.less'

interface HealthBarProps {
	width?: string
	height?: string
	withText?: boolean
	health: number
	maxHealth: number
}

const HealthBar: FC<HealthBarProps> = props => {
	const percent = props.health > 0 ? props.health / props.maxHealth : 0
	const width = `${percent * 100}%`
	const rgb = (1 - percent) * (255 * 2)
	const g = 255 - (rgb > 255 ? rgb - 255 : 0)
	const r = Math.min(rgb, 255)
	const backgroundColor = `rgb(${r}, ${g}, 0)`
	return (
		<div style={{ width: props.width || '5rem', height: props.height || '0.5rem' }} className={styles.wrapper}>
			<div style={{ width, backgroundColor }} className={styles.health} />
			{props.withText ? (
				<div className={styles.text}>
					{props.health} / {props.maxHealth}
				</div>
			) : null}
		</div>
	)
}

export default HealthBar
