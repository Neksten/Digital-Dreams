import React, {useEffect, useState} from 'react';
import styles from './Card.module.scss'
import {
	addCartReducerAction,
	removeCartReducerAction, updateCountCartReducerAction,
} from "../../store/cartsReducer";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Counter from "../Counter/Counter";


const Card = ({product}) => {
	const dispatch = useDispatch()
	
	// Все товары в каталоге
	const carts = useSelector(state => state.cartsReducer.carts)
	const productCart = carts.find(i => i.productId === product.id)
	
	// Добавить в корзину
	async function addCartProduct(product) {
		const newProduct = {
			...product,
			productId: product.id,
			count: 1
		}
		try {
			await axios.post('https://645e82ea8d08100293016ab6.mockapi.io/cart', newProduct)
			dispatch(addCartReducerAction(newProduct))
		} catch (e) {
			console.error('Error carts storage: ', e.message)
		}
	}
	// Удалить из корзины
	async function removeCartProduct(product) {
		// получаю элемент, который нужно удалить с бэка
		try {
			const cartProduct = carts.find(i => i.productId === product.id && i)
			await axios.delete(`https://645e82ea8d08100293016ab6.mockapi.io/cart/${cartProduct.id}`)
			dispatch(removeCartReducerAction(product.id))
		} catch (e) {
			console.error('Error carts remove: ', e.message)
		}
	}
	// Счётчик +
	async function handleCountIncrementClick() {
		// const newCarts = carts.map(product => product.productId === Number(productCart.id)
		// 	? {...product, count: productCart.count + 1}
		// 	: product
		// )
		console.log(carts)
		try {
			// console.log(productCart.id)
			await axios.put(`https://645e82ea8d08100293016ab6.mockapi.io/cart/${productCart.id}`, {count: productCart.count + 1})
			dispatch(updateCountCartReducerAction({id: product.id, count: productCart.count + 1}))
		} catch (e) {
			console.error('Error increment card', e.message)
		}
	}
	// Счётчик -
	function handleCountDecrementClick() {
		dispatch(updateCountCartReducerAction({id: product.id, count: productCart.count - 1}))
	}
	
	useEffect(() => {
		// Удалить из корзины если счётчик 0
		if (productCart && !productCart.count) {
			removeCartProduct(product)
		}
	}, [productCart && productCart.count, product.id])
	
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
			{productCart && productCart.count >= 1 ?
				<Counter handleCountDecrementClick={handleCountDecrementClick} handleCountIncrementClick={handleCountIncrementClick} count={productCart.count}/>
				:
				<div onClick={() => addCartProduct(product)} className={styles.cardBtn}>В корзину</div>
			}
		</div>
	);
};

export default Card;