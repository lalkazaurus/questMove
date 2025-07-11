import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Footer from '../layout/footer/Footer'
import Header from '../layout/header/Header'
import AddQuest from '../pages/addQuest/AddQuest'
import Error from '../pages/error/Error'
import Main from '../pages/main/Main'
import QuestPage from '../pages/questPage/questPage'
import QuestSuccess from '../pages/questSuccess/QuestSuccess'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		errorElement: <Error />,
	},
	{
		path: '/addQuest',
		element: <AddQuest />,
		errorElement: <h1>Xалепа</h1>,
	},
	{
		path: '/quest/:id',
		element: <QuestPage />,
		errorElement: <h1>Xалепа</h1>,
	},
	{
		path: '/quest-success/:id',
		element: <QuestSuccess />,
		errorElement: <h1>Xалепа</h1>,
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
