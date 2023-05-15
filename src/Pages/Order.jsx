import React from 'react';
import SidebarFinal from "../compontents/SidebarFinal/SidebarFinal";
import {useDispatch, useSelector} from "react-redux";
import {useContext} from "react";
import CartContext from "../context";
import CustomInputForm from "../compontents/CustomInputForm/CustomInputForm";
import {useEffect} from "react";
import YandexMap from "../compontents/YandexMap/YandexMap";

const Order = () => {
	const {
		totalPrice,
		totalSale,
		setTotalPrice,
		setTotalSale,
		calculateTotalPrices
	} = useContext(CartContext)
	
	const dispatch = useDispatch()
	// Все товары в корзине
	const cartProducts = useSelector(state => state.cartReducer.cart)
	
	// Количество товаров в корзине
	const cartProductsLength = cartProducts.length
	
	useEffect(() => {
		const { totalPrice, totalSale } = calculateTotalPrices(cartProducts);
		setTotalPrice(totalPrice);
		setTotalSale(totalSale);
	}, [cartProducts])
	
	return (
		<main className="page order">
			<div className="container">
				<section className="heroOrder">
					<h3 className="title">Оформление</h3>
					<div className="heroContent">
						<div className="heroForms">
							<form action="" className="userForm">
								<h4 className="userFormTitle subtitle"></h4>
								<div className="userFormRow">
									<CustomInputForm name="Имя" htmlFor="userName"/>
									<CustomInputForm name="Фамилия" htmlFor="userSurname"/>
								</div>
								<div className="userFormRow">
									<CustomInputForm name="Телефон" htmlFor="userPhone" action="phone"/>
									<CustomInputForm name="Email" htmlFor="userEmail" action="email"/>
								</div>
							</form>
							
							<YandexMap/>
						</div>
						<SidebarFinal textBtn="Оформить" totalPrice={totalPrice} totalSale={totalSale} length={cartProductsLength}/>
					</div>
				</section>
			</div>
		</main>
	);
};

export default Order;