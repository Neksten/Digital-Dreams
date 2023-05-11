import React from 'react';
import styles from './Header.module.scss'
import {Cart} from "../../assets/Cart";
import {Favorite} from "../../assets/Favorite";
import {User} from "../../assets/User";

const Header = () => {
	return (
		<div className={styles.header}>
				<div className="container">
					<nav className={styles.menu}>
						<h4 className={styles.title}>DigitalDreams</h4>
						<ul className={styles.list}>
							<li>
								<a href="" className={styles.link}><Cart/> <span>567руб.</span></a>
							</li>
							<li>
								<a href="" className={styles.link}><Favorite/></a>
							</li>
							<li>
								<a href="" className={styles.link}><User/></a>
							</li>
						</ul>
					</nav>
				</div>
		</div>
	);
};

export default Header;