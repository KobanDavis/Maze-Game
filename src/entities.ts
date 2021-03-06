import { Entity, EntityType, ArmorPiece, Weapon, Stats } from './types'

import bagofgold from './assets/bagofgold.png'
import pileofcoins from './assets/pileofcoins.png'
import fewcoins from './assets/fewcoins.png'

import broadsword from './assets/broadsword.png'
import sharpbone from './assets/sharpbone.png'
import spear from './assets/spear.png'
import brick from './assets/brick.png'
import knife from './assets/knife.png'
import bomb from './assets/bomb.png'
import mace from './assets/mace.png'
import dagger from './assets/dagger.png'

import helmet from './assets/helmet.png'
import chestplate from './assets/chestplate.png'
import leggings from './assets/leggings.png'
import boots from './assets/boots.png'

import bigpotion from './assets/bigpotion.png'
import smallpotion from './assets/smallpotion.png'

import skeleton from './assets/skeleton.png'
import zombie from './assets/zombie.png'
import goblin from './assets/goblin.png'

import ladder from './assets/ladder.png'

const gold: Entity<number>[] = [
	{
		name: 'bag of gold',
		type: 'gold',
		action: 50,
		image: bagofgold
	},
	{
		name: 'pile of gold',
		type: 'gold',
		action: 100,
		image: pileofcoins
	},
	{
		name: 'small pile of gold',
		type: 'gold',
		action: 20,
		image: fewcoins
	}
]

const weapon: Entity<Weapon>[] = [
	{
		name: 'brick',
		type: 'weapon',
		action: {
			attack: 2,
			durability: 20,
			maxDurability: 20
		},
		image: brick
	},
	{
		name: 'sharp bone',
		type: 'weapon',
		action: {
			attack: 4,
			durability: 12,
			maxDurability: 12
		},
		image: sharpbone
	},
	{
		name: 'spear',
		type: 'weapon',
		action: {
			attack: 6,
			durability: 5,
			maxDurability: 5
		},
		image: spear
	},
	{
		name: 'knife',
		type: 'weapon',
		action: {
			attack: 4,
			durability: 12,
			maxDurability: 12
		},
		image: knife
	},
	{
		name: 'broadsword',
		type: 'weapon',
		action: {
			attack: 5,
			durability: 20,
			maxDurability: 20
		},
		image: broadsword
	},
	{
		name: 'bomb',
		type: 'weapon',
		action: {
			attack: 30,
			durability: 1,
			maxDurability: 1
		},
		image: bomb
	},
	{
		name: 'mace',
		type: 'weapon',
		action: {
			attack: 8,
			durability: 6,
			maxDurability: 6
		},
		image: mace
	},
	{
		name: 'dagger',
		type: 'weapon',
		action: {
			attack: 6,
			durability: 10,
			maxDurability: 10
		},
		image: dagger
	}
]

const armor: Entity<ArmorPiece>[] = [
	{
		name: 'helmet',
		type: 'armor',
		action: {
			type: 'helmet',
			defence: 3,
			durability: 15,
			maxDurability: 15
		},
		image: helmet
	},
	{
		name: 'chestplate',
		type: 'armor',
		action: {
			type: 'chestplate',
			defence: 5,
			durability: 15,
			maxDurability: 15
		},
		image: chestplate
	},
	{
		name: 'pair of chain leggings',
		type: 'armor',
		action: {
			type: 'leggings',
			defence: 3,
			durability: 15,
			maxDurability: 15
		},
		image: leggings
	},
	{
		name: 'pair of boots',
		type: 'armor',
		action: {
			type: 'boots',
			defence: 2,
			durability: 15,
			maxDurability: 15
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
