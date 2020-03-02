import React, { FC, useRef, useEffect, useState } from 'react'
import { useGame } from '../../providers/GameProvider'
import { Location } from '../Icons'

import styles from './index.module.less'
import { useUser } from '../../providers/UserProvider'
import { Room, Coords } from '../../types'

interface TransformObj {
	x: number
	y: number
	zoom: number
}

const Minimap: FC = () => {
	const { gameState } = useGame()
	const { user } = useUser()
	const roomRef = useRef<HTMLDivElement>(null)
	const mapRef = useRef<HTMLDivElement>(null)
	const [position, setPosition] = useState<Coords>({ x: 0, y: 0 })
	const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

	const transformDefault: TransformObj = { x: 0, y: 0, zoom: 1 }
	const [transform, setTransform] = useState<TransformObj>(transformDefault)
	const focusCurrentRoom = (): void => {
		const room = roomRef.current
		const map = mapRef.current
		const height = map.clientHeight / 2 - room.clientHeight / 2 - room.offsetTop
		const width = map.clientWidth / 2 - room.clientWidth / 2 - room.offsetLeft
		setPosition({ x: width, y: height })
	}

	useEffect(() => {
		if (position && roomRef.current && !transform.x && !transform.y) {
			focusCurrentRoom()
		}
	}, [user.position])

	useEffect(() => {
		const handleMouseUp = (): void => setIsMouseDown(false)

		window.addEventListener('mouseup', handleMouseUp)
		return (): void => window.removeEventListener('mouseup', handleMouseUp)
	}, [])

	if (!user.position) return null

	const isCurrent = (room: Room): boolean => room.x === user.position.x && room.y === user.position.y
	const isExit = (room: Room): boolean => room.x === gameState.exit.x && room.y === gameState.exit.y
	const handleScroll = (e: React.WheelEvent): void => {
		if (e.deltaY > 0 && transform.zoom > 0.1) {
			setTransform(o => ({ ...o, zoom: o.zoom - 0.1 }))
		} else if (transform.zoom < 2) {
			setTransform(o => ({ ...o, zoom: o.zoom + 0.1 }))
		}
	}

	const handleDrag = (e: React.MouseEvent): void => {
		e.persist()
		if (isMouseDown) {
			setTransform(o => ({ ...o, x: o.x + e.movementX, y: o.y + e.movementY }))
		}
	}

	return (
		<div onMouseDown={(): void => setIsMouseDown(true)} onMouseMove={handleDrag} ref={mapRef} onWheel={handleScroll} className={styles.wrapper}>
			{transform.x || transform.y || transform.zoom !== 1 ? (
				<div
					onClick={(): void => {
						setTransform(transformDefault)
						focusCurrentRoom()
					}}
					className={styles.location}
				>
					<Location />
				</div>
			) : null}
			<div
				style={{ top: position.y, left: position.x, transform: `scale(${transform.zoom}) translate(${transform.x}px, ${transform.y}px)` }}
				className={styles.map}
			>
				{gameState.maze.map((row, i) => (
					<div key={i} className={styles.row}>
						{row.map((room, i) => (
							<div
								ref={isCurrent(room) ? roomRef : undefined}
								className={[
									styles.room,
									...(room.isVisited ? [styles.visited] : []),
									...(isCurrent(room) ? [styles.current] : []),
									...(isExit(room) ? [styles.exit] : [])
								].join(' ')}
								key={i}
							>
								{room.isVisited ? (
									<>
										{!room.passages[0] ? <div className={[styles.passage, styles.top].join(' ')} /> : null}
										{!room.passages[1] ? <div className={[styles.passage, styles.right].join(' ')} /> : null}
										{!room.passages[2] ? <div className={[styles.passage, styles.bottom].join(' ')} /> : null}
										{!room.passages[3] ? <div className={[styles.passage, styles.left].join(' ')} /> : null}
									</>
								) : null}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default Minimap
