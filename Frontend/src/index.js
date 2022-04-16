import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyles from './theme/GlobalStyles'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<GlobalStyles />
			<App />
		</BrowserRouter>
	</React.StrictMode>
)
