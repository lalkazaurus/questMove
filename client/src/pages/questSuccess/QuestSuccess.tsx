import { HiCake } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import styles from './QuestSuccess.module.css'

export default function QuestSuccess() {
	const { id } = useParams()

	return (
		<div className={styles.container}>
			<h1>Congratulations</h1>
			<p>You have successfully finished quest №{id}</p>
			<a href='/'>Check another quests on our site</a>
			<HiCake className={styles.cake} size={100} />
		</div>
	)
}
