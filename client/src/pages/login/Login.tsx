import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingComponent from '../../layout/loading-component/LoadingComponent'
import { ProfileService } from '../../services/profile.service'
import type { AppDispatch, RootState } from '../../store/store'
import { checkAuth, logout } from '../../store/userSlice/userSlice'
import type { QuestProgress } from '../../types/QuestProgress'
import LoginForm from './components/loginForm/LoginForm'
import QuestElement from './components/questElement/QuestElement'
import styles from './Login.module.css'

export default function Login() {
	const dispatch = useDispatch<AppDispatch>()
	const { user, isLoading, isAuth } = useSelector(
		(state: RootState) => state.user
	)
	const [questsProgress, setQuestsProgress] = useState<QuestProgress[]>([])
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

	async function getQuestsProgress() {
		try {
			const userId = Number(user.id)
			const response = await ProfileService.getQuestProgressByUserId(userId)
			setQuestsProgress(response.data)
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
					<h1 className={styles.username}>{user.nickname}</h1>
					<p className={styles.email}>EMAIL: {user.email}</p>

					<p className={styles.status}>
						{user.isActivated ? '✅ ACCOUNT ACTIVATED' : '❌ NOT ACTIVATED'}
					</p>

					<p className={styles.status}>ROLE: {user.role.toUpperCase()}</p>

					<div className={styles.buttonContainer}>
						<button
							className={`${styles.button} ${styles.getUsers}`}
							onClick={getQuestsProgress}
						>
							GET QUESTS
						</button>
						<button
							className={`${styles.button} ${styles.logout}`}
							onClick={() => dispatch(logout())}
						>
							LOGOUT
						</button>
					</div>
				</div>

				<div className={styles.right}>
					<h3 className={styles.questsHeader}>YOUR QUESTS</h3>
					{questsProgress.length === 0 ? (
						<p className={styles.emptyState}>
							NO QUESTS YET. CLICK "GET QUESTS" OR START YOUR JOURNEY.
						</p>
					) : (
						questsProgress.map(quest => (
							<QuestElement quest={quest} key={quest.questId} />
						))
					)}
				</div>
			</div>
		</div>
	)
}
