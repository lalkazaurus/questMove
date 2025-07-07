import type { Quest } from '../../../../types/Quest'
import styles from './QuestElement.module.css'

interface QuestProps {
	quest: Quest
}

export default function QuestElement({ quest }: QuestProps) {
	return (
		<div className={styles.container}>
			<a className={styles.link} href={`/quest/${quest.id}`}>
				<h3 className={styles.title}>{quest.name}</h3>
				<span>{quest.description}</span>
				<span>Author: {quest.createdBy}</span>
				<span>Amount of checkpoints: {quest.checkpoints.length}</span>
			</a>
		</div>
	)
}
