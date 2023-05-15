import React, {useContext, useState} from 'react';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {axiosCartProducts} from "../asyncActions/cart";
import CartProduct from "../compontents/CartProduct/CartProduct";
import {CartEmpty} from "../assets/CartEmpty";
import SidebarFinal from "../compontents/SidebarFinal/SidebarFinal";
import CartContext from "../context";


const Cart = () => {
	const {
		totalPrice,
		setTotalPrice,
		totalSale,
		setTotalSale,
		calculateTotalPrices
	} = useContext(CartContext)
	
	const dispatch = useDispatch()
	// Все товары в корзине
	const cartProducts = useSelector(state => state.cartsReducer.cart)
	
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
		const { totalPrice, totalSale } = calculateTotalPrices(cartProducts);
		setTotalPrice(totalPrice);
		setTotalSale(totalSale);
	}, [cartProducts])
	
	// debugger
	return (
		<main className="page cart">
			<div className="container">
				<section className="heroCart">
					<div className="heroTop">
						<h3>Корзина</h3>
						<span>{productsLength} товара</span>
					</div>
					{
						productsLength
							?
							<div className="heroContent">
								<div className="heroProducts">
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
							<div className="heroEmpty">
								<div className="content">
									<div className="image">
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