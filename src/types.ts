export interface Room {
	passages: [boolean, boolean, boolean, boolean] // NESW
	isVisited: boolean
	x: number
	y: number
	step: number // Maze gen
	entity: Entity<any>
}

export interface Entity<T> {
	name: string
	message?: string
	type: EntityType
	action: T
	image: string
}

export type EntityType = 'armor' | 'weapon' | 'gold' | 'enemy' | 'potion' | 'exit'

export interface DialogueState {
	textSpeed: number
	messages: string[]
}

export interface GameState {
	isGameLoaded: boolean
	width: number
	height: number
	start: Coords
	exit: Coords
	maze: Room[][]
	chances: EntityChances
	enemy: Entity<Stats>
	playerWon: boolean
}

export interface UserState extends Stats {
	inventory: Entity<any>[]
	position: Coords
	armor: Record<ArmorType, Entity<ArmorPiece>>
	weapon: Entity<Weapon>
}

export interface Weapon {
	attack: number
}

export interface ArmorPiece {
	defence: number
	type: ArmorType
}

export type ArmorType = 'helmet' | 'chestplate' | 'leggings' | 'boots'

export interface Coords {
	x: number
	y: number
}

export interface Stats {
	gold: number
	health: number
	maxHealth: number
	attack: number
	defence: number
	luck: number
}

export type GoldAmount = number

export type EntityChances = Record<EntityType, number>
