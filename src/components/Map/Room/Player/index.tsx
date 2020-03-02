import React, { FC, useEffect, useState } from 'react'
import styles from './index.module.less'
import { Coords } from '../../../../types'
import PlayerSprite from '../../../PlayerSprite'

interface PlayerProps {
	position: Coords
	setPosition: React.Dispatch<React.SetStateAction<Coords>>
}

const Player: FC<PlayerProps> = props => {
	const [isFlipped, setIsFlipped] = useState<boolean>(false)
	const [heldKeys, setHeldKeys] = useState<Set<string>>(new Set())

	useEffect(() => {
		const intervals: { [key: string]: number } = {}
		const handleKeyDown = (e: KeyboardEvent): void => {
			switch (e.key) {
				case 'w':
					if (!heldKeys.has('w')) {
						setHeldKeys(o => (o.add('w'), o))
						intervals.w = setInterval(
							() =>
								props.setPosition(position => {
									const { x, y } = position
									return { x, y: y !== 15 ? y - 1 : y }
								}),
							15
						)
					}
					break
				case 'a':
					if (!heldKeys.has('a')) {
						setIsFlipped(true)
						setHeldKeys(o => (o.add('a'), o))
						intervals.a = setInterval(
							() =>
								props.setPosition(position => {
									const { x, y } = position
									return { x: x !== 10 ? x - 1 : x, y }
								}),
							15
						)
					}
					break
				case 's':
					if (!heldKeys.has('s')) {
						setHeldKeys(o => (o.add('s'), o))
						intervals.s = setInterval(
							() =>
								props.setPosition(position => {
									const { x, y } = position
									return { x, y: y !== 85 ? y + 1 : y }
								}),
							15
						)
					}
					break
				case 'd':
					if (!heldKeys.has('d')) {
						setIsFlipped(false)
						setHeldKeys(o => (o.add('d'), o))
						intervals.d = setInterval(
							() =>
								props.setPosition(position => {
									const { x, y } = position
									return { x: x !== 90 ? x + 1 : x, y }
								}),
							15
						)
					}
					break
				default:
					break
			}
		}
		const handleKeyUp = (e: KeyboardEvent): void => {
			setHeldKeys(o => {
				o.delete(e.key)
				clearInterval(intervals[e.key])
				return o
			})
		}

		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)

		return (): void => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
			Object.values(intervals).forEach(clearInterval)
		}
	}, [])
	return (
		<div
			className={styles.player}
			style={{
				top: `calc(${props.position.y}% - 32px)`,
				left: `calc(${props.position.x}% - 32px)`,
				transform: `translateZ(50px) ${isFlipped ? 'scaleX(-1)' : ''}`
			}}
		>
			<PlayerSprite />
		</div>
	)
}

export default Player
