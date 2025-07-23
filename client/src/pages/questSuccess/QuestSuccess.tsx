import { useRef } from 'react'
import { HiCake } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../layout/loading-component/LoadingComponent'
import UnauthorizedComponent from '../../layout/unathorized-component/UnauthorizedComponent'
import type { AppDispatch, RootState } from '../../store/store'
import { addDoneQuest } from '../../store/userSlice/userSlice'
import styles from './QuestSuccess.module.css'

export default function QuestSuccess() {
	const { id } = useParams()
	const dispatch = useDispatch<AppDispatch>()
	const { user, isAuth, isLoading, questProgress } = useSelector(
		(state: RootState) => state.user
	)

	const questId = Number(id)
	const hasDispatched = useRef(false)

	if (isLoading || !user || !questProgress) {
		return <LoadingComponent />
	}

	if (!isAuth) {
		return <UnauthorizedComponent />
	}

	if (!hasDispatched.current && !user.done_quests.includes(questId)) {
		hasDispatched.current = true
		dispatch(addDoneQuest({ userId: Number(user.id), questId }))
		return <div>Updating quest progress...</div>
	}

	return (
		<div className={styles.container}>
			<h1>Congratulations</h1>
			<p>
				You have successfully finished{' '}
				{user.done_quests.includes(questId) && <strong>again</strong>} quest №
				{questProgress.questId}
				<br />
				Status: {questProgress.status}
				<br />
				Time: {questProgress.completedAt}
			</p>
			<a href='/'>Check other quests on our site</a>
			<HiCake className={styles.cake} size={100} />
		</div>
	)
}
