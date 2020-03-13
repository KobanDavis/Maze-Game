import React, { useState, useContext, createContext, FC, useEffect } from 'react'
import { GameState, Room, Coords, EntityChances, EntityType, Entity, Stats } from '../types'
import entities from '../entities'

interface GameContext {
	deleteSavedGame(): void
	gameState: GameState
	setGameState(state: GameState): void
	deleteEntity(coords: Coords): void
	startGame(): void
	createNewGame(): void
	loadSavedGame(): void
	saveGame(): void
	setRoomVisited(coords: Coords): void
	startFight(entity: Entity<Stats>): void
	attackEnemy(damage: number): void
	endFight(): void
	endGame(playerWon: boolean): void
}

enum Direction {
	NORTH,
	EAST,
	SOUTH,
	WEST
}

interface Temp {
	maze: Room[][]
	queue: Map<string, Neighbor>
}

interface Neighbor {
	x: number
	y: number
	direction: Direction
	step: number
}

interface Maze {
	height: number
	width: number
}

const GameProvider: FC = props => {
	const randRange = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min

	const initMaze = (): Room[][] => {
		const matrix: Room[][] = []

		for (let y = 0; y < height; y++) {
			const temp: Room[] = []
			for (let x = 0; x < width; x++) {
				temp.push({ x, y, passages: [true, true, true, true], isVisited: false, step: 0, entity: null })
			}
			matrix.push(temp)
		}

		return matrix
	}

	const step = (state: Temp, initX: number, initY: number): Coords => {
		pushUnvisitedNeighborsToQueue(state, initX, initY)
		const i = state.queue.size > 3 ? (Math.random() > 0.2 ? state.queue.size - 2 : state.queue.size - 1) : 0
		const key = [...state.queue.keys()][i]
		const [x, y] = key.split('_').map(Number)
		const tile: Neighbor = state.queue.get(key)

		state.maze[y][x].isVisited = true
		state.queue.delete(key)

		const neighbor: Neighbor = { ...tile, x, y }
		breakWall(state, tile.x, tile.y, neighbor)

		return { x, y }
	}

	const generateExit = (maze: Room[][]): Room => {
		let furthest: Room = maze[0][0]
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				if (maze[y][x].step > furthest.step) {
					furthest = maze[y][x]
				}
			}
		}
		;[furthest.entity] = entities.exit
		return furthest
	}

	const generateMaze = (maze: Room[][]): Room[][] => {
		// Temp mutable state
		const state: Temp = {
			maze,
			queue: new Map<string, Neighbor>()
		}

		let { x, y } = position

		state.maze[y][x].isVisited = true

		do {
			const t = step(state, x, y)
			x = t.x
			y = t.y
		} while (state.queue.size)

		const generateEntity = (): Entity<any> => {
			const rand = Math.floor(Math.random() * 100)
			let entityType: EntityType = null
			let count = 100
			const o = Object.entries(chances).map<[number, EntityType]>(([k, v]) => [(count -= v), k as EntityType], [])

			for (let i = 0; i < o.length; i++) {
				const [chance, type] = o[i]
				if (chance < rand) {
					entityType = type
					break
				}
			}
			if (entityType === null) return null
			const type = entities[entityType]
			const entity = type[Math.floor(Math.random() * type.length)]
			return JSON.parse(JSON.stringify(entity))
		}

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				state.maze[y][x].isVisited = false
				state.maze[y][x].entity = generateEntity()
			}
		}

		state.maze[y][x].entity = null

		return state.maze
	}

	const breakWall = (state: Temp, x: number, y: number, neighbor: Neighbor): void => {
		let oppDirection: number
		switch (neighbor.direction) {
			case Direction.NORTH:
				oppDirection = Direction.SOUTH
				break
			case Direction.EAST:
				oppDirection = Direction.WEST
				break
			case Direction.SOUTH:
				oppDirection = Direction.NORTH
				break
			case Direction.WEST:
				oppDirection = Direction.EAST
				break
			default:
				throw new Error("This shouldn't occur.")
		}

		state.maze[y][x].passages[neighbor.direction] = false
		state.maze[neighbor.y][neighbor.x].passages[oppDirection] = false
	}

	const pushUnvisitedNeighborsToQueue = (state: Temp, x: number, y: number): void => {
		const coords: Neighbor[] = []
		const step = state.maze[y][x].step + 1
		if (y) coords.push({ x, y: y - 1, direction: Direction.NORTH, step })
		if (x < width - 1) coords.push({ x: x + 1, y, direction: Direction.EAST, step })
		if (y < height - 1) coords.push({ x, y: y + 1, direction: Direction.SOUTH, step })
		if (x) coords.push({ x: x - 1, y, direction: Direction.WEST, step })
		const neighbors = coords.filter(({ x, y }) => !state.maze[y][x].isVisited)
		neighbors.forEach(n => {
			state.maze[n.y][n.x].step = n.step
			state.queue.set([n.x, n.y].join('_'), { ...n, x, y })
		})
	}

	const getRandomPosition = (): Coords => ({ x: randRange(0, width), y: randRange(0, height) })

	const deleteEntity = (coords: Coords): void => {
		setGameState(o => {
			const maze = o.maze.slice()
			maze[coords.y][coords.x].entity = null
			return { ...o, maze }
		})
	}

	const setRoomVisited = (coords: Coords): void => {
		setGameState(o => {
			const maze = o.maze.slice()
			maze[coords.y][coords.x].isVisited = true
			return { ...o, maze }
		})
	}

	const width = 8
	const height = 8
	const chances: EntityChances = {
		gold: 10,
		armor: 10,
		weapon: 10,
		enemy: 15,
		potion: 10,
		exit: 0 // doesnt matter here
	}
	const [position] = useState<Coords>(getRandomPosition())
	const [gameState, setGameState] = useState<GameState>({
		width,
		height,
		maze: null,
		start: position,
		exit: null,
		chances,
		isGameLoaded: false,
		enemy: null,
		playerWon: null
	})

	const startGame = (): void => {
		setGameState(o => ({ ...o, isGameLoaded: true }))
		deleteEntity(gameState.start)
	}

	const loadSavedGame = (): void => {
		const state = JSON.parse(localStorage.getItem('gameState'))
		setGameState(state)
	}

	const createNewGame = (): void => {
		const maze = generateMaze(initMaze())
		const exit = generateExit(maze)
		setGameState(() => ({
			maze,
			width,
			height,
			start: position,
			exit,
			chances,
			isGameLoaded: false,
			enemy: null,
			playerWon: null
		}))
	}

	const saveGame = (): void => localStorage.setItem('gameState', JSON.stringify(gameState))

	const startFight = (entity: Entity<Stats>): void => {
		const enemy = { ...entity, action: { ...entity.action } }
		setGameState(o => ({ ...o, enemy }))
	}

	const attackEnemy = (damage: number): void => {
		setGameState(o => {
			const enemy = { ...gameState.enemy } as Entity<Stats>
			enemy.action.health -= damage
			return { ...o, enemy }
		})
	}

	const endFight = (): void => {
		setGameState(o => ({ ...o, enemy: null }))
	}

	const endGame = (playerWon: boolean): void => {
		setGameState(o => ({ ...o, playerWon }))
		setImmediate(deleteSavedGame) // wait for gameState change, then clear localStorage, weird case
	}

	const deleteSavedGame = (): void => localStorage.clear()

	useEffect(() => {
		if (gameState.isGameLoaded) {
			saveGame()
		}
	}, [gameState])

	return (
		<Game.Provider
			value={{
				gameState,
				setGameState,
				deleteEntity,
				startGame,
				loadSavedGame,
				createNewGame,
				saveGame,
				setRoomVisited,
				startFight,
				attackEnemy,
				endFight,
				endGame,
				deleteSavedGame
			}}
			{...props}
		/>
	)
}

const Game = createContext<GameContext>(null)
const useGame = (): GameContext => useContext<GameContext>(Game)

export { useGame, GameProvider }
