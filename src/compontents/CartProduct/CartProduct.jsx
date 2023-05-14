import React from 'react';
import styles from './CartProduct.module.scss'
import Counter from "../Counter/Counter";
import classNames from 'classnames/bind';
import {Cross} from "../../assets/Cross";

let cx = classNames.bind(styles);

const CartProduct = ({product}) => {
	return (
		<div className={styles.cartProduct}>
			<div className={styles.image}>
				<img src={product.imgUrl} alt="cart product"/>
			</div>
			<div className={styles.info}>
				<div className={styles.left}>
					<p className={styles.name}>{product.title}</p>
					<div>
						<span className={styles.brand}>{product.brand}</span>
						<div className={styles.remove}><Cross/> <span>Удалить</span></div>
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.amount}>
						<span className={cx(`${styles.price}`, {
							black: !product.sale,
						})}>
							{product.sale ? product.sale : product.price} ₽
						</span>
						{product.sale && <span className={styles.sale}>{product.price} ₽</span>}
					</div>
					<Counter count={product.count}/>
				</div>
			</div>
		</div>
	);
};

export default CartProduct;