import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingComponent from '../../layout/loadingComponent/LoadingComponent'
import { UserService } from '../../services/user.service'
import type { AppDispatch, RootState } from '../../store/store'
import { checkAuth, logout } from '../../store/userSlice/userSlice'
import type { IUser } from '../../types/User'
import LoginForm from './components/loginForm/LoginForm'
import styles from './Login.module.css'

export default function Login() {
	const dispatch = useDispatch<AppDispatch>()
	const { user, isLoading, isAuth } = useSelector(
		(state: RootState) => state.user
	)
	const [users, setUsers] = useState<IUser[]>([])
	const [initialCheckDone, setInitialCheckDone] = useState(false)

	useEffect(() => {
		const checkAuthentication = async () => {
			if (localStorage.getItem('token')) {
				await dispatch(checkAuth())
			}
			setInitialCheckDone(true)
		}
		checkAuthentication()
	}, [dispatch])

	async function getUsers() {
		try {
			const response = await UserService.fetchUsers()
			setUsers(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	if (!initialCheckDone || isLoading) {
		return <LoadingComponent />
	}

	if (!isAuth) {
		return <LoginForm />
	}

	return (
		<div className={styles.container}>
			<div className={styles.profile}>
				<div className={styles.left}>
					<h1 className={styles.username}>{`User: ${user.email}`}</h1>
					<h2 className={styles.status}>
						{user.isActivated
							? '✅ Account is activated'
							: '❌ Activate your account'}
					</h2>

					<div className={styles.buttonContainer}>
						<button
							className={styles.logout}
							onClick={() => dispatch(logout())}
						>
							Logout
						</button>
						<button className={styles.getUsers} onClick={getUsers}>
							Get users
						</button>
					</div>
				</div>

				<div className={styles.right}>
					<h3>👥 Users:</h3>
					{users.length === 0 && <p>No users yet. Click “Get users”.</p>}
					{users.map(user => (
						<div className={styles.user} key={user.email}>
							{user.email}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
