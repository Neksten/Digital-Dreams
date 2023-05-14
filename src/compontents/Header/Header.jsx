import React from 'react';
import styles from './Header.module.scss'
import {Cart} from "../../assets/Cart";
import {Favorite} from "../../assets/Favorite";
import {User} from "../../assets/User";
import {NavLink, useLocation} from "react-router-dom";
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

const Header = () => {
	const location = useLocation();
	const currentUrl = location.pathname;
	
	return (
		<div className={cx(`${styles.header}`, {
			absolute: currentUrl === '/',
		})}>
				<div className="container">
					<nav className={styles.menu}>
						<NavLink to="/"><h4 className={styles.title}>DigitalDreams</h4></NavLink>
						<ul className={styles.list}>
							<li>
								<NavLink to="/cart" className={styles.link}><Cart/> <span>567руб.</span></NavLink>
							</li>
							<li>
								<NavLink to="" className={styles.link}><Favorite/></NavLink>
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