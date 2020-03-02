import React, { useState, useContext, createContext, FC } from 'react'
import { DialogueState } from '../types'

interface DialogueContext extends DialogueState {
	sendMessage(msg: string): void
	clearMessages(): void
}

const DialogueProvider: FC = props => {
	const sendMessage = (msg: string): void => setDialogue(o => ({ ...o, messages: [...o.messages, msg] }))
	const [dialogue, setDialogue] = useState<DialogueState>({
		textSpeed: 2,
		messages: []
	})

	const clearMessages = (): void => {
		setDialogue(o => ({ ...o, messages: [] }))
	}

	return <Dialogue.Provider value={{ ...dialogue, sendMessage, clearMessages }} {...props} />
}
const Dialogue = createContext<DialogueContext>(null)
const useDialogue = (): DialogueContext => useContext<DialogueContext>(Dialogue)

export { useDialogue, DialogueProvider }
