import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Footer from '../layout/footer/Footer'
import Header from '../layout/header/Header'
import AddQuest from '../pages/addQuest/AddQuest'
import Error from '../pages/error/Error'
import Login from '../pages/login/Login'
import Main from '../pages/main/Main'
import QuestPage from '../pages/questPage/QuestPage'
import QuestSuccess from '../pages/questSuccess/QuestSuccess'
import Register from '../pages/register/Register'
import { checkAuth } from '../store/userSlice/userSlice'

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
	{
		path: '/user/login',
		element: <Login />,
		errorElement: <h1>Xалепа</h1>,
	},
	{
		path: '/user/register',
		element: <Register />,
		errorElement: <h1>Xалепа</h1>,
	},
])

export default function Router() {
	const dispatch = useDispatch()
	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth())
		}
	}, [dispatch])

	return (
		<>
			<Header />
			<RouterProvider router={router} />
			<Footer />
		</>
	)
}
