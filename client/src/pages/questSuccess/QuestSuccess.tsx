import { useParams } from 'react-router-dom'

export default function QuestSuccess() {
	const { id } = useParams()

	return (
		<div>
			<h1>Congratulations</h1>
			<p>You have successfully finished quest №{id}</p>
			<a href='/'>Check another quests on our site</a>
		</div>
	)
}
