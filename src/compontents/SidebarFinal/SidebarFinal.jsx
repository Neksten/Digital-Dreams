import React from 'react';
import styles from './SidebarFinal.module.scss'
import {Link} from "react-router-dom";

const SidebarFinal = ({textBtn, length, totalSale, totalPrice, redirect, send, onSendForm}) => {
	return (
		<div className={styles.heroSidebar}>
			<Link to={redirect}><span onClick={(e) => send && onSendForm(e)} className={styles.arrange}>{textBtn}</span></Link>
			<div className={styles.info}>
				<span className={styles.total}>Всего: {length} товара</span>
				<div className={styles.sale}>
					<span className={styles.title}>Скидка</span>
					<span className={styles.price}>{totalSale} ₽</span>
				</div>
				<div className={styles.totalPrice}>
					<span className={styles.title}>Итого</span>
					<span className={styles.price}>{totalPrice} ₽</span>
				</div>
			</div>
		</div>
	);
};

export default SidebarFinal;