import React from 'react';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {axiosCartProducts} from "../asyncActions/cart";
import CartProduct from "../compontents/CartProduct/CartProduct";
import {Link} from "react-router-dom";

const Cart = () => {
	const dispatch = useDispatch()
	// Все товары в корзине
	const products = useSelector(state => state.cartsReducer.carts)
	const productsLength = products.length
	
	useEffect(() => {
		dispatch(axiosCartProducts())
	}, [])
	
	// console.log(products)
	return (
		<main className="page cart">
			<div className="container">
				<section className="heroCart">
					<div className="heroTop">
						<h3>Корзина</h3>
						<span>{productsLength} товара</span>
					</div>
					<div className="heroContent">
						<div className="heroProducts">
							{products.map(product => (
								<CartProduct key={product.id} product={product}/>
							))}
						</div>
						<div className="heroSidebar">
							<Link to=""><span className="arrange">Перейти к оформлению</span></Link>
							<div className="info">
								<span className="total">Всего: {productsLength} товара</span>
								<div className="sale">
									<span className="title">Скидка</span>
									<span className="price">15890₽</span>
								</div>
								<div className="totalPrice">
									<span className="title">Итого</span>
									<span className="price">8596 ₽</span>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
};

export default Cart;