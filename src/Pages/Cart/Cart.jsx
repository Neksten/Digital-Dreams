import React, {useContext} from 'react';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {axiosCartProducts} from "../../asyncActions/cart";
import CartProduct from "../../compontents/CartProduct/CartProduct";
import {CartEmpty} from "../../assets/CartEmpty";
import SidebarFinal from "../../compontents/SidebarFinal/SidebarFinal";
import CartContext from "../../context";
import styles from  "./Cart.module.scss"

const Cart = () => {
	// Данные с контекста CartContext
	const {
		totalPrice,
		setTotalPrice,
		totalSale,
		setTotalSale,
		calculateTotalPrices
	} = useContext(CartContext)
	
	const dispatch = useDispatch()
	// Все товары в корзине
	const cartProducts = useSelector(state => state.cartReducer.cart)
	
	// обновить итоговую цену
	function updatedTotalPrice({price, status}) {
		setTotalPrice(prevTotalPrice => status === 'increment'
			? prevTotalPrice + price
			: prevTotalPrice - price
		)
	}
	
	// обновить итоговую скидку
	function updatedTotalSale({sale, status}) {
		setTotalSale(prevTotalSale => status === 'increment'
			? prevTotalSale + sale
			: prevTotalSale - sale
		)
	}
	
	// Колиечество товаров в корзине
	const productsLength = cartProducts.length
	
	useEffect(() => {
		// подгрузка товаров с бэка
		dispatch(axiosCartProducts())
	}, [])
	
	useEffect(() => {
		// считаю итоговую цену и скидку
		const { totalPrice, totalSale } = calculateTotalPrices(cartProducts);
		setTotalPrice(totalPrice);
		setTotalSale(totalSale);
	}, [cartProducts])
	
	// debugger
	return (
		<main className={`${styles.cart} page`}>
			<div className="container">
				<section className={styles.heroCart}>
					<div className={styles.heroTop}>
						<h3>Корзина</h3>
						<span>{productsLength} товара</span>
					</div>
					{
						productsLength
							?
							<div className={styles.heroContent}>
								<div className={styles.heroProducts}>
									{cartProducts.map(product => (
										<CartProduct key={product.id}
										             productCart={product}
										             updatedTotalPrice={updatedTotalPrice}
										             updatedTotalSale={updatedTotalSale}
										/>
									))}
								</div>
								<SidebarFinal textBtn={'Перейти к оформлению'} length={productsLength} totalSale={totalSale} totalPrice={totalPrice} redirect={'/order'}/>
							</div>
							:
							<div className={styles.heroEmpty}>
								<div className={styles.content}>
									<div className={styles.image}>
										<CartEmpty/>
									</div>
									<h4>Добавьте товары в корзину</h4>
								</div>
							</div>
					}
				</section>
			</div>
		</main>
	);
};

export default Cart;