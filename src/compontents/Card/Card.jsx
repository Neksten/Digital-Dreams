import React from 'react';
import styles from './Card.module.scss'

const Card = ({product}) => {
	return (
		<div className={styles.card}>
			<a href="" className={styles.cardBody}>
				<div className={styles.cardImage}>
					<img src={product.imgUrl} alt="product"/>
				</div>
				<span className={styles.cardPrice}>{product.price} ₽</span>
				{product.sale && <span className={styles.cardSale}>{product.sale} ₽</span>}
				<p className={styles.cardName}>{product.title}</p>
			</a>
			<a href="" className={styles.cardBtn}>В корзину</a>
		</div>
	);
};

export default Card;