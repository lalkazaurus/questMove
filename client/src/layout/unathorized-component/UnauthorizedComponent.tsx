import { GoAlertFill } from 'react-icons/go'
import styles from './UnauthorizedComponent.module.css'

export default function UnauthorizedComponent() {
	return (
		<div className={styles.container}>
			<GoAlertFill className={styles.icon} size={80} />
			<h1 className={styles.title}>You are unauthorized</h1>
			<p className={styles.text}>
				If you want to save your progress or write some reviews, please create
				an account or login if you already have one.
			</p>
			<a className={styles.link} href='/user/login'>
				Go to Account Page
			</a>
		</div>
	)
}
