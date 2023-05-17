import React, {useState} from 'react';
import CreditCard from "../CreditCard/CreditCard";
import CustomInputForm from "../CustomInputForm/CustomInputForm";
import styles from './CreditCardForm.module.scss'

const CreditCardForm = (props) => {
	const [flipped, setFlipped] = useState(false)
	// Приводим номер карты к нужному формату
	const formattedNumber = (str) => {
		return str.replace(/\d{4}(?=.)/g, '$& ');
	}
	
	return (
		<div className={styles.creditCardForm}>
			<div className={styles.creditCard}>
				<CreditCard number={props.data.cardNumber ? formattedNumber(String(props.data.cardNumber)) : formattedNumber('1234567890123456')}
				            name={props.data.cardHolder.toUpperCase()}
				            expiry="1225"
				            cvv={props.data.cardCvv ? props.data.cardCvv : '123'}
				            flipped={flipped}
				/>
			</div>
			<form action="">
				<div className={styles.row}>
					<CustomInputForm value={props.data.cardNumber}
					                 setValue={props.data.setCardNumber}
					                 name='Номер карты'
					                 htmlFor='Card Number'
					                 action="cardNumber"
					                 placeholder="номер карты"/>
					<CustomInputForm value={props.data.cardHolder}
					                 setValue={props.data.setCardHolder}
					                 name='Владелец карты'
					                 htmlFor='Card Holder'
					                 action="cardHolder"
					                 placeholder="владельца"/>
				</div>
				<div className={styles.row}>
					<div className={styles.row}>
						<CustomInputForm value={props.data.cardMonth}
						                 setValue={props.data.setCardMonth}
						                 name='Месяц выпуска'
						                 htmlFor='release Month'
						                 action="releaseMonth"
						                 placeholder="месяц "/>
						<CustomInputForm value={props.data.cardYear}
						                 setValue={props.data.setCardYear}
						                 name='Год выпуска'
						                 htmlFor='release Year'
						                 action="releaseYear"
						                 placeholder="год"/>
					</div>
					<CustomInputForm value={props.data.cardCvv}
					                 setValue={props.data.setCardCvv}
					                 name='CVV'
					                 htmlFor='Card Holder'
					                 action="cardCvv"
					                 placeholder="cvv"
					                 setFlipped={setFlipped}/>
				</div>
			</form>
		</div>
	);
};

export default CreditCardForm;