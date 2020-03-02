import React, { useState, useContext, createContext, FC, useEffect } from 'react'
import { UserState, Coords, Entity, ArmorType, ArmorPiece, Weapon } from '../types'
import { useGame } from './GameProvider'

interface UserContext {
	user: UserState
	setPosition(position: Coords): void
	addGold(gold: number): void
	loadSavedUser(): void
	saveUser(): void
	addToInventory(entity: Entity<any>): void
	equipArmor(entity: Entity<ArmorPiece>): void
	unequipArmor(type: ArmorType): void
	equipWeapon(entity: Entity<Weapon>): void
	unequipWeapon(): void
	consumePotion(entity: Entity<number>): void
	attackPlayer(damage: number): void
	createNewPlayer(): void
}

const UserProvider: FC = props => {
	const randRange = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min
	const [user, setUser] = useState<UserState>(null)
	const { gameState, setRoomVisited } = useGame()

	const createNewPlayer = (): void => {
		const health = randRange(10, 20)
		setUser({
			inventory: [],
			health,
			maxHealth: health,
			attack: randRange(4, 8),
			defence: randRange(2, 6),
			luck: 1,
			position: null,
			armor: {
				helmet: null,
				chestplate: null,
				leggings: null,
				boots: null
			},
			gold: 0,
			weapon: null
		})
	}

	const setPosition = (position: Coords): void => {
		setRoomVisited(position)
		setUser(o => ({ ...o, position }))
	}

	const addGold = (gold: number): void => {
		setUser(o => ({ ...o, gold: o.gold += gold }))
	}

	const loadSavedUser = (): void => {
		const user = JSON.parse(localStorage.getItem('user'))
		setUser(user)
	}

	const saveUser = (): void => localStorage.setItem('user', JSON.stringify(user))

	const addToInventory = (entity: Entity<any>): void => {
		setUser(o => ({ ...o, inventory: [...o.inventory, entity] }))
	}

	const equipArmor = (entity: Entity<ArmorPiece>): void => {
		setUser(o => {
			const inventory = o.inventory.slice()
			inventory.splice(
				o.inventory.findIndex(i => i.name === entity.name),
				1
			)
			return { ...o, inventory, armor: { ...o.armor, [entity.action.type]: entity } }
		})
	}

	const equipWeapon = (entity: Entity<Weapon>): void => {
		setUser(o => {
			const inventory = o.inventory.slice()
			inventory.splice(
				o.inventory.findIndex(i => i.name === entity.name),
				1
			)
			return { ...o, inventory, weapon: entity }
		})
	}

	const unequipWeapon = (): void => {
		setUser(o => {
			const inventory = o.inventory.slice()
			const weapon = { ...o.weapon } as Entity<Weapon>
			inventory.push(weapon)
			o.weapon = null
			return { ...o, inventory }
		})
	}

	const unequipArmor = (type: ArmorType): void => {
		setUser(o => {
			const inventory = o.inventory.slice()
			const armorPiece = { ...o.armor[type] } as Entity<ArmorPiece>
			inventory.push(armorPiece)
			o.armor[type] = null
			return { ...o, inventory }
		})
	}

	const consumePotion = (entity: Entity<number>): void => {
		setUser(o => {
			const inventory = o.inventory.slice()
			inventory.splice(
				o.inventory.findIndex(i => i.name === entity.name),
				1
			)
			const newHealth = o.health + entity.action
			const health = newHealth > user.maxHealth ? user.maxHealth : newHealth

			return { ...o, inventory, health }
		})
	}

	const attackPlayer = (damage: number): void => {
		setUser(o => {
			const health = o.health - damage
			return { ...o, health }
		})
	}

	useEffect(() => {
		if (gameState.isGameLoaded) {
			saveUser()
		}
	}, [user])

	return (
		<User.Provider
			value={{
				user,
				setPosition,
				addGold,
				loadSavedUser,
				saveUser,
				addToInventory,
				equipArmor,
				equipWeapon,
				consumePotion,
				unequipArmor,
				unequipWeapon,
				attackPlayer,
				createNewPlayer
			}}
			{...props}
		/>
	)
}
const User = createContext<UserContext>(null)
const useUser = (): UserContext => useContext<UserContext>(User)

export { useUser, UserProvider }
