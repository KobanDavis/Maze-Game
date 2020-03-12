import React, { FC, MouseEvent, useState, useRef } from 'react'

import styles from './index.module.less'
import { Entity, Coords, ArmorPiece } from '../../../types'
import { useUser } from '../../../providers/UserProvider'

interface EntitySquareProps {
	entity: Entity<any>
}

const EntitySquare: FC<EntitySquareProps> = props => {
	const [isHovering, setIsHovering] = useState<boolean>(false)
	const [position, setPosition] = useState<Coords>({ x: 0, y: 0 })
	const tooltip = useRef<HTMLDivElement>(null)
	const { equipArmor, equipWeapon, consumePotion, user, unequipArmor, unequipWeapon } = useUser()

	const handleMouseOver = (e: React.MouseEvent): void => {
		if (!isHovering) setIsHovering(true)
		if (props.entity && tooltip.current) {
			const x = e.pageX + tooltip.current.clientWidth > window.innerWidth ? e.pageX - (tooltip.current.clientWidth + 10) : e.pageX + 10
			const y = e.pageY - (tooltip.current.clientHeight + 10)
			setPosition({ x, y })
		}
	}

	const handleMouseOut = (): void => setIsHovering(false)

	const handleOnClick = (): void => {
		if (props.entity) {
			switch (props.entity.type) {
				case 'armor':
					if (user.armor[(props.entity.action as ArmorPiece).type] === null) {
						equipArmor(props.entity)
					} else {
						unequipArmor(props.entity.action.type)
					}
					break
				case 'potion':
					consumePotion(props.entity)
					break
				case 'weapon':
					if (user.weapon === null) {
						equipWeapon(props.entity)
					} else {
						unequipWeapon()
					}
					break
				default:
					break
			}
		}
	}

	const capitalize = (s: string): string => s.slice(0, 1).toUpperCase() + s.slice(1)

	const name = props.entity ? capitalize(props.entity.name) : null
	const type = props.entity ? capitalize(props.entity.type) : null

	let effect = null
	if (props.entity !== null) {
		switch (props.entity.type) {
			case 'armor':
				effect = `+${props.entity.action.defence} defence`
				break
			case 'potion':
				effect = `Restore ${props.entity.action} health`
				break
			case 'weapon':
				effect = `+${props.entity.action.attack} attack`
				break
			default:
				break
		}
	}

	return (
		<div onClick={handleOnClick} onMouseOut={handleMouseOut} onMouseMove={handleMouseOver} className={styles.wrapper}>
			{props.entity ? <img className={styles.icon} src={props.entity.image} /> : <div className={styles.icon} />}
			{isHovering && name ? (
				<div ref={tooltip} style={{ top: position.y, left: position.x }} className={styles.tooltip}>
					<div>{name}</div>
					<div className={styles.muted}>{type}</div>
					<div className={styles.muted}>{effect}</div>
				</div>
			) : null}
		</div>
	)
}

export default EntitySquare
