import React, {useState} from 'react';
import SidebarFinal from "../../compontents/SidebarFinal/SidebarFinal";
import {useDispatch, useSelector} from "react-redux";
import {useContext} from "react";
import CartContext from "../../context";
import CustomInputForm from "../../compontents/CustomInputForm/CustomInputForm";
import {useEffect} from "react";
import YandexMap from "../../compontents/YandexMap/YandexMap";
import CreditCardForm from "../../compontents/CreditCardForm/CreditCardForm";
import styles from './Order.module.scss'
import {axiosRemoveAllCartProduct} from "../../asyncActions/cart";
import { useNavigate } from 'react-router-dom';

const Order = () => {
	// Для успешного редиректа
	const navigate = useNavigate();
	
	const dispatch = useDispatch()
	
	// Данные с контекста CartContext
	const {
		totalPrice,
		totalSale,
		setTotalPrice,
		setTotalSale,
		calculateTotalPrices
	} = useContext(CartContext)
	
	// Данные о пользователе
	const [userName, setUserName] = useState('')
	const [userSurname, setUserSurname] = useState('')
	const [userPhone, setUserPhone] = useState('')
	const [userEmail, setUserEmail] = useState('')
	
	// Данные банковской карты
	const [cardHolder, setCardHolder] = useState('')
	const [cardNumber, setCardNumber] = useState('')
	const [cardCvv, setCardCvv] = useState('')
	// const [selectedMonth, setSelectedMonth] = useState('Month')
	// const [selectedYear, setSelectedYear] = useState('Year')
	const [cardMonth, setCardMonth] = useState('')
	const [cardYear, setCardYear] = useState('')
	
	// Данные адресса
	const [address, setAddress] = useState('')
	const [addressValid, setAddressValid] = useState(false)
	
	// Прокидываю пропсом в компонент CreditCardForm
	const creditCardFormData = {
		cardHolder,
		setCardHolder,
		cardNumber,
		setCardNumber,
		cardCvv,
		setCardCvv,
		cardMonth,
		setCardMonth,
		cardYear,
		setCardYear,
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
		// считаю итоговую цену и скидку
		const { totalPrice, totalSale } = calculateTotalPrices(cartProducts);
		setTotalPrice(totalPrice);
		setTotalSale(totalSale);
	}, [cartProducts])
	
	// Проверка данных на валидность и отправка формы json строкой в консоль
	function onSendForm(e) {
		e.preventDefault()
		if (cardNumber.length === 16
			&& cardHolder
			&& cardCvv.length === 3
			&& cardMonth
			&& cardYear
			&& userPhone.length === 12
			&& /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)
			&& addressValid
		) {
			const sendFormData = {...creditCardFormData, ...userData}
			console.log(JSON.stringify(sendFormData))
			// очистить корзину
			dispatch(axiosRemoveAllCartProduct())
			// redirect в корзину
			navigate('/cart')
		}
	}
	return (
		<main className={`${styles.order} page`}>
			<div className="container">
				<section className={styles.heroOrder}>
					<h3 className={styles.title}>Оформление</h3>
					<div className={styles.heroContent}>
						<div className={styles.heroForms}>
							<form action="" className={styles.userForm}>
								<h4 className={styles.userFormTitle}>Заберёт заказ</h4>
								<div className={styles.userFormRow}>
									<CustomInputForm name="Имя" htmlFor="userName" action="userName" placeholder="Имя" value={userName} setValue={setUserName}/>
									<CustomInputForm name="Фамилия" htmlFor="userSurname" action="userSurname" placeholder="Фамилия" value={userSurname} setValue={setUserSurname}/>
								</div>
								<div className={styles.userFormRow}>
									<CustomInputForm name="Телефон" htmlFor="userPhone" action="phone" placeholder="Телефон" value={userPhone} setValue={setUserPhone}/>
									<CustomInputForm name="Email" htmlFor="userEmail" action="email" placeholder="Email" value={userEmail} setValue={setUserEmail}/>
								</div>
							</form>
							<h4 className={styles.userFormTitle}>Оплата</h4>
							<div className={styles.creditCardForm}>
								<CreditCardForm data={creditCardFormData}/>
							</div>
							<h4 className={styles.userFormTitle}>Адрес</h4>
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