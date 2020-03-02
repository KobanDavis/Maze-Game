import React, { FC, useState, useEffect } from 'react'

import styles from './index.module.less'

interface FadeTextProps {
	text: string
}

const FadeText: FC<FadeTextProps> = props => {
	const [anim, setAnim] = useState<boolean>(false)

	useEffect(() => {
		setAnim(false)
		setTimeout(() => setAnim(true), 10)
	}, [props.text])

	return <div className={[styles.wrapper, ...(anim ? [styles.anim] : [])].join(' ')}>{props.text}</div>
}

export default FadeText
