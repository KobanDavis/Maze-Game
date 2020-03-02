import React, { FC } from 'react'
import sprite from '../../assets/sprite.png'
import spritehelmet from '../../assets/spritehelmet.png'
import spritechestplate from '../../assets/spritechestplate.png'
import spriteleggings from '../../assets/spriteleggings.png'
import spriteboots from '../../assets/spriteboots.png'
import styles from './index.module.less'
import { useUser } from '../../providers/UserProvider'

const PlayerSprite: FC = () => {
	const { user } = useUser()
	return (
		<div className={styles.player} style={{ backgroundImage: `url(${sprite})` }}>
			{user.armor.helmet ? <div className={styles.armor} style={{ backgroundImage: `url(${spritehelmet})` }} /> : null}
			{user.armor.chestplate ? <div className={styles.armor} style={{ backgroundImage: `url(${spritechestplate})` }} /> : null}
			{user.armor.leggings ? <div className={styles.armor} style={{ backgroundImage: `url(${spriteleggings})` }} /> : null}
			{user.armor.boots ? <div className={styles.armor} style={{ backgroundImage: `url(${spriteboots})` }} /> : null}
			{user.weapon ? <div className={styles.weapon} style={{ backgroundImage: `url(${user.weapon.image})` }} /> : null}
		</div>
	)
}

export default PlayerSprite
