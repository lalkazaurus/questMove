import type { QuestProgress } from '../../../../types/QuestProgress'
import styles from './QuestElement.module.css'

interface QuestElementData {
	quest: QuestProgress
}

export default function QuestElement({ quest }: QuestElementData) {
	return (
		<a className={styles.linkWrap} href={`/quest/${quest.questId}`}>
			<div className={styles.questCard}>
				<h3 className={styles.questTitle}>QUEST #{quest.questId}</h3>
				<div className={styles.questMeta}>
					<span className={styles.questStatus}>
						{quest.status.toUpperCase()}
					</span>
					<span>{quest.completedAt}</span>
				</div>
			</div>
		</a>
	)
}
