import React, {useEffect} from 'react';
import styles from './CartProduct.module.scss'
import Counter from "../Counter/Counter";
import classNames from 'classnames/bind';
import {Cross} from "../../assets/Cross";
import {
	axiosProductCountDecrementClick,
	axiosProductCountIncrementClick,
	axiosRemoveCartProduct
} from "../../asyncActions/cart";
import {useDispatch, useSelector} from "react-redux";

let cx = classNames.bind(styles);

const CartProduct = ({productCart, updatedTotalPrice, updatedTotalSale}) => {
	const dispatch = useDispatch()
	
	// Все товары
	const products = useSelector(state => state.productsReducer.products)
	// товар из корзины
	const product = products.find(i => i.id === productCart.id)

	// посчитать скидки
	const countSale = (product, status, count) => {
		if (product.retailPrice) {
			let sale = (product.retailPrice - product.discountPrice)
			if (count) {
				sale *= count
			}
			updatedTotalSale({sale, status: status})
		}
	}
	
	const countPrice = (product, status, count) => {
		count
			? updatedTotalPrice({price: product.discountPrice * count, status})
			: updatedTotalPrice({price: product.discountPrice, status})
	}
	
	// Удалить из корзины
	async function removeCartProduct(product) {
		dispatch(axiosRemoveCartProduct(product.id))
		
		//цена
		countPrice(product, 'decrement', productCart.count)
		//скидка
		countSale(product, 'decrement', productCart.count)
	}
	
	// Счётчик +
	async function handleCountIncrementClick(product) {
		dispatch(axiosProductCountIncrementClick(product.id))
		
		//цена
		countPrice(product, 'increment')
		//скидка
		countSale(product, 'increment')
	}
	// Счётчик -
	function handleCountDecrementClick(product) {
		if (productCart.count !== 1) {
			dispatch(axiosProductCountDecrementClick(product.id))
			
			//цена
			countPrice(product, 'decrement')
			//скидка
			countSale(product, 'decrement')
		}
	}

	useEffect(() => {
		//цена
		countPrice(product, 'increment', productCart.count)
		//скидка
		countSale(product, 'increment', productCart.count)
	}, [])
	
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
						<div onClick={() => removeCartProduct(product)} className={styles.remove}><Cross/> <span>Удалить</span></div>
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.amount}>
						<span className={cx(`${styles.price}`, {
							black: !product.retailPrice,
						})}>
							{product.discountPrice} ₽
						</span>
						{product.retailPrice && <span className={styles.sale}>{product.retailPrice} ₽</span>}
					</div>
					<Counter handleCountDecrementClick={() => handleCountDecrementClick(product)}
					         handleCountIncrementClick={() => handleCountIncrementClick(product)}
					         count={productCart.count}
					         hidenull
					/>
				</div>
			</div>
		</div>
	);
};

export default CartProduct;