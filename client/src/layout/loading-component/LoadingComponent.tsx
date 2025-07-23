import { HashLoader } from 'react-spinners'
import styles from './LoadingComponent.module.css'

export default function LoadingComponent() {
	return (
		<div className={styles.container}>
			<HashLoader color='#a5a3f1' size={80} />
		</div>
	)
}
