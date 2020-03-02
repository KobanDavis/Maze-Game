import React, { FC, useState, useEffect } from 'react'

interface TypedTextProps {
	text: string
	speed?: number
}

const TypedText: FC<TypedTextProps> = props => {
	const [text, setText] = useState<string>('')
	useEffect(() => {
		const getTimeout = (): number => {
			let timeout = (props.speed || 3) * 25
			if (props.text[text.length - 1] === '.') timeout *= 5
			return timeout
		}
		if (text.length !== props.text.length) {
			setTimeout(setText, getTimeout(), props.text.slice(0, text.length + 1))
		}
		return (): void => {}
	}, [text])
	return <span>{text}</span>
}

export default TypedText
