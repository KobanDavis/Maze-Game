import React, { FC, useState, useEffect } from 'react'

import styles from './index.module.less'

interface FadeTextProps {
	text: string
}

const FadeText: FC<FadeTextProps> = props => {
	const [key, setKey] = useState<number>(0)
	useEffect(() => setKey(key + 1), [props.text])
	return (
		<div key={key} className={styles.wrapper}>
			{props.text}
		</div>
	)
}

export default FadeText
