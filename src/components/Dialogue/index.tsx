import React, { FC, useEffect, useRef } from 'react'
import styles from './index.module.less'
import { useDialogue } from '../../providers/DialogueProvider'
import TypedText from '../TypedText'

const Dialogue: FC = () => {
	const { messages, textSpeed } = useDialogue()
	const box = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (box.current) setTimeout(() => (box.current.scrollTop = box.current.scrollHeight), 25 * textSpeed)
	}, [messages.length])

	return (
		<div ref={box} className={styles.wrapper}>
			{messages.map((msg, i) => (
				<div className={styles.message} key={i}>
					<TypedText text={msg} speed={textSpeed} />
				</div>
			))}
		</div>
	)
}

export default Dialogue
