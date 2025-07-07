import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import Router from './router/Router.tsx'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<StrictMode>
			<Router />
		</StrictMode>
	</Provider>
)
