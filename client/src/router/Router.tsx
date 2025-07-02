import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Footer from '../layout/footer/Footer'
import Header from '../layout/header/Header'
import Main from '../pages/main/Main'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
	},
])

export default function Router() {
	return (
		<>
			<Header />
			<RouterProvider router={router} />
			<Footer />
		</>
	)
}
