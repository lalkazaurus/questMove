import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa6'

import styles from './Footer.module.css'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.top}>
					<div className={styles.brand}>
						<a href='/' className={styles.logo}>
							<img src='1.png' className={styles.logoImg} alt='Flowbite Logo' />
							<span className={styles.logoText}>QuestMove</span>
						</a>
					</div>

					<div className={styles.linkGrid}>
						<div className={styles.linkSection}>
							<h2>Resources</h2>
							<ul>
								<li>
									<a href='https://redux.js.org/'>Redux</a>
								</li>
								<li>
									<a href='https://leafletjs.com/'>Leaflet</a>
								</li>
							</ul>
						</div>
						<div className={styles.linkSection}>
							<h2>Follow us</h2>
							<ul>
								<li>
									<a href='https://github.com/lalkazaurus'>Github</a>
								</li>
								<li>
									<a href='https://www.instagram.com/lalkazauruss/'>
										Instagram
									</a>
								</li>
							</ul>
						</div>
						<div className={styles.linkSection}>
							<h2>Legal</h2>
							<ul>
								<li>
									<a href='#'>Privacy Policy</a>
								</li>
								<li>
									<a href='#'>Terms & Conditions</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<hr className={styles.divider} />

				<div className={styles.bottom}>
					<span className={styles.copyright}>
						© 2025 Lalkazaurus. All Rights Reserved.
					</span>
					<div className={styles.socials}>
						<a href='#'>
							<span className='sr-only'>
								<FaDiscord size={25} />
							</span>
						</a>
						<a href='#'>
							<span className='sr-only'>
								<FaInstagram size={25} />
							</span>
						</a>
						<a href='#'>
							<span className='sr-only'>
								<FaGithub size={25} />
							</span>
						</a>
						<a href='#'>
							<span className='sr-only'>
								<FaLinkedin size={25} />
							</span>
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}
