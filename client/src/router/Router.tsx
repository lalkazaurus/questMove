import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Footer from '../layout/footer/Footer'
import Header from '../layout/header/Header'
import AddQuest from '../pages/addQuest/AddQuest'
import Error from '../pages/error/Error'
import Main from '../pages/main/Main'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		errorElement: <Error />,
	},
	{
		path: '/addQuest',
		element: <AddQuest />,
		errorElement: <h1>Пизда прийшла</h1>,
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
