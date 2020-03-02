import React, { FC, useEffect, useState } from 'react'
import { useUser } from '../../../providers/UserProvider'

import Player from './Player'
import Entity from './Entity'

import wallRotated from '../../../assets/wall-rotate.png'
import wall from '../../../assets/wall.png'
import floor from '../../../assets/floor.png'

import styles from './index.module.less'
import { Coords, Room } from '../../../types'
import { useDialogue } from '../../../providers/DialogueProvider'

interface RoomProps {
	room: Room
}

const RoomComponent: FC<RoomProps> = props => {
	const { setPosition } = useUser()
	const { sendMessage } = useDialogue()
	const [playerPosition, setPlayerPosition] = useState<Coords>({ x: 50, y: 50 })
	const [isTransitioning, setIsTransitioning] = useState<boolean>(false)

	const { room } = props

	const updatePosition = async (position: Coords): Promise<void> => {
		const sleep = (t: number): Promise<void> => new Promise(r => setTimeout(r, t))
		setIsTransitioning(true)
		await sleep(200)
		setPosition(position)
		setPlayerPosition(o => ({ x: 100 - o.x, y: 100 - o.y }))
		setIsTransitioning(false)
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent): void => {
			const isEnemy = room.entity && room.entity.type === 'enemy'
			if (e.key === ' ' && !isTransitioning) {
				if (!room.passages[0] && playerPosition.y === 15 && playerPosition.x > 40 && playerPosition.x < 60)
					if (isEnemy) {
						sendMessage('The passages are blocked!')
					} else {
						updatePosition({ x: room.x, y: room.y - 1 })
					}
				if (!room.passages[2] && playerPosition.y === 85 && playerPosition.x > 40 && playerPosition.x < 60)
					if (isEnemy) {
						sendMessage('The passages are blocked!')
					} else {
						updatePosition({ x: room.x, y: room.y + 1 })
					}
				if (!room.passages[3] && playerPosition.x === 10 && playerPosition.y > 40 && playerPosition.y < 60)
					if (isEnemy) {
						sendMessage('The passages are blocked!')
					} else {
						updatePosition({ x: room.x - 1, y: room.y })
					}
				if (!room.passages[1] && playerPosition.x === 90 && playerPosition.y > 40 && playerPosition.y < 60)
					if (isEnemy) {
						sendMessage('The passages are blocked!')
					} else {
						updatePosition({ x: room.x + 1, y: room.y })
					}
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return (): void => window.removeEventListener('keydown', handleKeyDown)
	}, [playerPosition, isTransitioning])

	return (
		<div className={[styles.window, ...(isTransitioning ? [styles.fade] : [])].join(' ')}>
			<div className={styles.wrapper}>
				<Entity playerPosition={playerPosition} room={room} />
				<Player setPosition={setPlayerPosition} position={playerPosition} />
				<>
					{/* Walls and floor */}
					<div className={[styles.top, styles.room].join(' ')} style={{ backgroundImage: `url(${wall})` }} />
					<div className={[styles.right, styles.room].join(' ')} style={{ backgroundImage: `url(${wallRotated})` }} />
					<div className={[styles.bottom, styles.room].join(' ')} style={{ backgroundImage: `url(${wall})` }} />
					<div className={[styles.left, styles.room].join(' ')} style={{ backgroundImage: `url(${wallRotated})` }} />
					<div className={[styles.floor, styles.room].join(' ')} style={{ backgroundImage: `url(${floor})` }} />
				</>
				<>
					{/* Doors */}
					{!room.passages[0] ? (
						<div
							className={[styles.topDoor, styles.room].join(' ')}
							style={{
								backgroundImage: room.entity && room.entity.type === 'enemy' ? `url(${wall})` : undefined,
								borderImage: `url(${wall}) 4 repeat`
							}}
						/>
					) : null}
					{!room.passages[1] ? (
						<div
							className={[styles.rightDoor, styles.room].join(' ')}
							style={{
								backgroundImage: room.entity && room.entity.type === 'enemy' ? `url(${wallRotated})` : undefined,
								borderImage: `url(${wallRotated}) 4 repeat`
							}}
						/>
					) : null}
					{!room.passages[2] ? (
						<div
							className={[styles.bottomDoor, styles.room].join(' ')}
							style={{
								backgroundImage: room.entity && room.entity.type === 'enemy' ? `url(${wall})` : undefined,
								borderImage: `url(${wall}) 4 repeat`
							}}
						/>
					) : null}
					{!room.passages[3] ? (
						<div
							className={[styles.leftDoor, styles.room].join(' ')}
							style={{
								backgroundImage: room.entity && room.entity.type === 'enemy' ? `url(${wallRotated})` : undefined,
								borderImage: `url(${wallRotated}) 4 repeat`
							}}
						/>
					) : null}
				</>
			</div>
		</div>
	)
}

export default RoomComponent
