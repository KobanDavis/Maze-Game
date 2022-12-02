import React, { FC, useState, useEffect } from 'react'
import { useUser } from '../../../../providers/UserProvider'
import { useDialogue } from '../../../../providers/DialogueProvider'

import styles from './index.module.less'
import { Room, Coords, Entity } from '../../../../types'
import { useGame } from '../../../../providers/GameProvider'

interface EntityProps {
	room: Room
	playerPosition: Coords
}

const EntityComponent: FC<EntityProps> = (props) => {
	const [visitedRooms, setVisitedRooms] = useState<Set<string>>(new Set())
	const { user, addGold, addToInventory } = useUser()
	const { deleteEntity, startFight, endGame, gameState } = useGame()
	const { sendMessage } = useDialogue()
	const { room, playerPosition } = props

	const interact = (entity: Entity<any>): void => {
		switch (entity.type) {
			case 'enemy':
				startFight(entity)
				break
			case 'exit':
				endGame(true)
				break
			case 'gold':
				addGold(entity.action)
				sendMessage(`You picked up the ${entity.name} (+${entity.action}g)`)
				break
			case 'armor':
			case 'potion':
			case 'weapon':
				addToInventory(entity)
				break
			default:
				break
		}
		deleteEntity({ x: room.x, y: room.y })
	}

	useEffect(() => {
		const coords = [room.x, room.y].join('_')
		if (!visitedRooms.has(coords)) {
			if (room.step === 0 && visitedRooms.size === 0) sendMessage('You wake up in the middle of a maze. Find your way out!')
			else if (room.entity === null) sendMessage('The room is empty.')
			else if (room.entity.type === 'enemy') sendMessage(`You found an evil ${room.entity.name}!`)
			else {
				const n = /[aeiou]/i.test(room.entity.name.charAt(0)) ? 'n' : '' // starts with vowel?
				sendMessage(room.entity.type === 'exit' ? 'You found the exit!' : `You found a${n} ${room.entity.name}!`)
			}
			setVisitedRooms((o) => (o.add(coords), o))
		}
	}, [user.position])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent): void => {
			if (room.entity && e.key === ' ' && playerPosition.x > 40 && playerPosition.x < 60 && playerPosition.y > 40 && playerPosition.y < 60) {
				interact(room.entity)
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return (): void => window.removeEventListener('keydown', handleKeyDown)
	}, [playerPosition])

	useEffect(() => {
		if (visitedRooms.size > 1) {
			setVisitedRooms(new Set())
		}
	}, [gameState.exit, visitedRooms.size])

	return room.entity ? (
		<div
			className={styles.entity}
			style={{
				zIndex: 1,
				transform: `scale(${room.entity.type === 'enemy' || room.entity.type === 'exit' ? 1.2 : 0.7})`,
				backgroundImage: `url(${room.entity.image})`,
			}}
		></div>
	) : null
}

export default EntityComponent
