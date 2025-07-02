import styles from './Header.module.css'

export default function Header() {
	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<a href='/' className={styles.logo}>
					<img src='1.png' className={styles.logoImg} alt='Logo' />
					<span className={styles.logoText}>QuestMove</span>
				</a>

				<div className={styles.navMenu} id='navbar-user'>
					<ul className={styles.navList}>
						<li>
							<a href='#' className={styles.activeLink}>
								Home
							</a>
						</li>
						<li>
							<a href='#'>About</a>
						</li>
						<li>
							<a href='#'>Services</a>
						</li>
						<li>
							<a href='#'>Pricing</a>
						</li>
						<li>
							<a href='#'>Contact</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}
