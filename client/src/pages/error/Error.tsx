import { useEffect } from 'react'
import styles from './Error.module.css'

export default function Error() {
	useEffect(() => {
		const createPins = () => {
			const container = document.querySelector(`.${styles.pins}`)
			if (!container) return
			container.innerHTML = ''
			for (let i = 0; i < 50; i++) {
				const pin = document.createElement('div')
				pin.className = styles.pin
				const x = Math.random() * 100
				const y = Math.random() * 100
				pin.style.cssText = `left:${x}%; top:${y}%; animation-duration:${
					Math.random() * 2 + 2
				}s; animation-delay:${Math.random() * 3}s;`
				container.appendChild(pin)
			}
		}
		createPins()
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.mapBackground}></div>
			<div className={styles.pins}></div>

			<img src='/2.png' alt='Compass' className={styles.compass} />

			<h1 className={styles.title}>404</h1>
			<p className={styles.subtitle}>Вибач, сторінка зникла на карті</p>

			<button
				className={styles.button}
				onClick={() => (window.location.href = '/')}
			>
				Повернутися назад
			</button>

			<svg className={styles.wave} viewBox='0 0 1440 100'>
				<path
					fill='rgba(255,255,255,0.2)'
					d='M0,20 C360,80 1080,0 1440,60 L1440,100 L0,100 Z'
				/>
			</svg>
		</div>
	)
}
