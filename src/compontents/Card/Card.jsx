import React, {useEffect} from 'react';
import styles from './Card.module.scss'
import {useDispatch, useSelector} from "react-redux";
import Counter from "../Counter/Counter";
import {
	axiosAddCartProduct,
	axiosProductCountDecrementClick,
	axiosProductCountIncrementClick,
	axiosRemoveCartProduct
} from "../../asyncActions/cart";


const Card = ({product}) => {
	const dispatch = useDispatch()
	
	// Все товары в каталоге
	const cart = useSelector(state => state.cartReducer.cart)
	// Получаем элемент из корзины если он есть
	const productCart = cart.find(i => i.id === product.id)
	
	// Добавить в корзину
	async function addCartProduct(product) {
		dispatch(axiosAddCartProduct(product))
	}
	// Удалить из корзины
	async function removeCartProduct(product) {
		dispatch(axiosRemoveCartProduct(product.id))
	}
	
	// Счётчик +
	async function handleCountIncrementClick(product) {
		dispatch(axiosProductCountIncrementClick(product.id))
	}
	// Счётчик -
	function handleCountDecrementClick(product) {
		dispatch(axiosProductCountDecrementClick(product.id))
	}
	
	useEffect(() => {
		// Удалить из корзины если счётчик 0
		if (productCart && !productCart.count) {
			removeCartProduct(product)
				.catch(e => console.log(e.message))
		}
	}, [productCart && productCart.count, product.id])
	
	return (
		<div className={styles.card}>
			<a href="" className={styles.cardBody}>
				<div className={styles.cardImage}>
					<img src={product.imgUrl} alt="product"/>
				</div>
				<span className={styles.cardPrice}>{product.discountPrice} ₽</span>
				{product.retailPrice && <span className={styles.cardSale}>{product.retailPrice} ₽</span>}
				<p className={styles.cardName}>{product.title}</p>
			</a>
			{productCart && productCart.count >= 1 ?
				<Counter handleCountDecrementClick={() => handleCountDecrementClick(product)}
				         handleCountIncrementClick={() => handleCountIncrementClick(product)}
				         count={productCart.count}/>
				:
				<div onClick={() => addCartProduct(product)} className={styles.cardBtn}>В корзину</div>
			}
		</div>
	);
};

export default Card;