import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './index.less'
import { GameProvider } from './providers/GameProvider'
import { UserProvider } from './providers/UserProvider'
import { DialogueProvider } from './providers/DialogueProvider'

const AppWithProviders: FC = () => (
	<DialogueProvider>
		<GameProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</GameProvider>
	</DialogueProvider>
)

ReactDOM.render(<AppWithProviders />, document.getElementById('app'))
