import React, {useState} from 'react';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {axiosCartProducts} from "../asyncActions/cart";
import CartProduct from "../compontents/CartProduct/CartProduct";
import {Link} from "react-router-dom";
import {CartIcon} from "../assets/CartIcon";
import {CartEmpty} from "../assets/CartEmpty";


const Cart = () => {
	const [totalPrice, setTotalPrice] = useState(0)
	const [totalSale, setTotalSale] = useState(0)

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
								<div className="heroSidebar">
									<Link to=""><span className="arrange">Перейти к оформлению</span></Link>
									<div className="info">
										<span className="total">Всего: {productsLength} товара</span>
										<div className="sale">
											<span className="title">Скидка</span>
											<span className="price">{totalSale} ₽</span>
										</div>
										<div className="totalPrice">
											<span className="title">Итого</span>
											<span className="price">{totalPrice} ₽</span>
										</div>
									</div>
								</div>
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