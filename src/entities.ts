import { Entity, EntityType, ArmorPiece, Weapon, Stats } from './types'

import bagofgold from './assets/bagofgold.png'
import skeleton from './assets/skeleton.png'
import zombie from './assets/zombie.png'
import goblin from './assets/goblin.png'
import ladder from './assets/ladder.png'
import broadsword from './assets/broadsword.png'
import sharpbone from './assets/sharpbone.png'
import bigpotion from './assets/bigpotion.png'
import smallpotion from './assets/smallpotion.png'
import helmet from './assets/helmet.png'
import chestplate from './assets/chestplate.png'
import leggings from './assets/leggings.png'
import boots from './assets/boots.png'
import pileofcoins from './assets/pileofcoins.png'

const gold: Entity<number>[] = [
	{
		name: 'bag of gold',
		type: 'gold',
		action: 100,
		image: bagofgold
	},
	{
		name: 'pile of coins',
		type: 'gold',
		action: 50,
		image: pileofcoins
	}
]

const weapon: Entity<Weapon>[] = [
	{
		name: 'broadsword',
		type: 'weapon',
		action: {
			attack: 5
		},
		image: broadsword
	},
	{
		name: 'sharp bone',
		type: 'weapon',
		action: {
			attack: 2
		},
		image: sharpbone
	}
]

const armor: Entity<ArmorPiece>[] = [
	{
		name: 'helmet',
		type: 'armor',
		action: {
			type: 'helmet',
			defence: 3
		},
		image: helmet
	},
	{
		name: 'chestplate',
		type: 'armor',
		action: {
			type: 'chestplate',
			defence: 5
		},
		image: chestplate
	},
	{
		name: 'pair of chain leggings',
		type: 'armor',
		action: {
			type: 'leggings',
			defence: 3
		},
		image: leggings
	},
	{
		name: 'pair of boots',
		type: 'armor',
		action: {
			type: 'boots',
			defence: 2
		},
		image: boots
	}
]

const enemy: Entity<Stats>[] = [
	{
		name: 'skeleton',
		type: 'enemy',
		action: {
			attack: 2,
			defence: 3,
			gold: 30,
			health: 10,
			maxHealth: 10,
			luck: 1
		},
		image: skeleton
	},
	{
		name: 'zombie',
		type: 'enemy',
		action: {
			attack: 4,
			defence: 2,
			gold: 50,
			health: 16,
			maxHealth: 16,
			luck: 1
		},
		image: zombie
	},
	{
		name: 'goblin',
		type: 'enemy',
		action: {
			attack: 3,
			defence: 3,
			gold: 100,
			health: 12,
			maxHealth: 12,
			luck: 3
		},
		image: goblin
	}
]

const potion: Entity<number>[] = [
	{
		name: 'big potion',
		type: 'potion',
		action: 10,
		image: bigpotion
	},
	{
		name: 'small potion',
		type: 'potion',
		action: 5,
		image: smallpotion
	}
]

const exit: Entity<null>[] = [
	{
		name: 'exit',
		type: 'exit',
		action: null,
		image: ladder
	}
]

type EntityObject = Record<EntityType, Entity<any>[]>

const entities: EntityObject = { gold, weapon, armor, enemy, potion, exit }

export default entities
