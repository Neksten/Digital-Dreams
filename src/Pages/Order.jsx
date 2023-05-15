import React, {useState} from 'react';
import SidebarFinal from "../compontents/SidebarFinal/SidebarFinal";
import {useDispatch, useSelector} from "react-redux";
import {useContext} from "react";
import CartContext from "../context";
import CustomInputForm from "../compontents/CustomInputForm/CustomInputForm";
import {useEffect} from "react";
import YandexMap from "../compontents/YandexMap/YandexMap";
import CreditCardForm from "../compontents/CreditCardForm/CreditCardForm";


const Order = () => {
	const {
		totalPrice,
		totalSale,
		setTotalPrice,
		setTotalSale,
		calculateTotalPrices
	} = useContext(CartContext)
	
	const [userName, setUserName] = useState('')
	const [userSurname, setUserSurname] = useState('')
	const [userPhone, setUserPhone] = useState('')
	const [userEmail, setUserEmail] = useState('')
	
	const [cardHolder, setCardHolder] = useState('')
	const [cardNumber, setCardNumber] = useState('')
	const [cardCvv, setCardCvv] = useState('')
	const [selectedMonth, setSelectedMonth] = useState('Month')
	const [selectedYear, setSelectedYear] = useState('Year')
	
	const [address, setAddress] = useState('')
	const [addressValid, setAddressValid] = useState(false)
	
	const creditCardFormData = {
		cardHolder,
		setCardHolder,
		cardNumber,
		setCardNumber,
		cardCvv,
		setCardCvv,
		selectedMonth,
		setSelectedMonth,
		selectedYear,
		setSelectedYear,
	}
	const userData = {
		userName,
		setUserName,
		userSurname,
		setUserSurname,
		userPhone,
		setUserPhone,
		userEmail,
		setUserEmail
	}
	// Все товары в корзине
	const cartProducts = useSelector(state => state.cartReducer.cart)
	
	// Количество товаров в корзине
	const cartProductsLength = cartProducts.length
	
	useEffect(() => {
		const { totalPrice, totalSale } = calculateTotalPrices(cartProducts);
		setTotalPrice(totalPrice);
		setTotalSale(totalSale);
	}, [cartProducts])
	
	function onSendForm(e) {
		e.preventDefault()
		if (cardNumber.length === 16
			&& cardHolder
			&& selectedMonth
			&& setSelectedYear
			&& cardCvv
			&& userPhone.length === 11
			&& /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)
			&& addressValid
		) {
			const sendFormData = {...creditCardFormData, ...userData}
			console.log(JSON.stringify(sendFormData))
		}
	}
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
									<CustomInputForm name="Имя" htmlFor="userName" action="userName" placeholder="Имя" value={userName} setValue={setUserName}/>
									<CustomInputForm name="Фамилия" htmlFor="userSurname" action="userSurname" placeholder="Фамилия" value={userSurname} setValue={setUserSurname}/>
								</div>
								<div className="userFormRow">
									<CustomInputForm name="Телефон" htmlFor="userPhone" action="phone" placeholder="Телефон" value={userPhone} setValue={setUserPhone}/>
									<CustomInputForm name="Email" htmlFor="userEmail" action="email" placeholder="Email" value={userEmail} setValue={setUserEmail}/>
								</div>
							</form>
							<CreditCardForm data={creditCardFormData}/>
							<YandexMap value={address} setValue={setAddress} setAddressValid={setAddressValid}/>
						</div>
						<SidebarFinal textBtn="Оформить" totalPrice={totalPrice} totalSale={totalSale} length={cartProductsLength} send onSendForm={onSendForm}/>
					</div>
				</section>
			</div>
		</main>
	);
};

export default Order;