import React, {useState} from 'react';
import CreditCard from "../CreditCard/CreditCard";
import CustomInputForm from "../CustomInputForm/CustomInputForm";
import DropDown from "../DropDown/DropDown";

const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
const years = ['2023', '2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034']

const CreditCardForm = (props) => {
	const [flipped, setFlipped] = useState(false)
	// Приводим номер карты к нужному формату
	const formattedNumber = (str) => {
		return str.replace(/\d{4}(?=.)/g, '$& ');
	}
	
	return (
		<div className="creditCardForm">
			<div className="creditCard">
				<CreditCard number={props.data.cardNumber ? formattedNumber(String(props.data.cardNumber)) : formattedNumber('1234567890123456')}
				            name={props.data.cardHolder.toUpperCase()}
				            expiry="1225"
				            cvv="123"
				            flipped={flipped}
				/>
			</div>
			<form action="">
				<div className="row">
					<CustomInputForm value={props.data.cardNumber}
					                 setValue={props.data.setCardNumber}
					                 name='Card Number'
					                 htmlFor='Card Number'
					                 action="cardNumber"
					                 placeholder="номер карты"/>
					<CustomInputForm value={props.data.cardHolder}
					                 setValue={props.data.setCardHolder}
					                 name='Card Holder'
					                 htmlFor='Card Holder'
					                 action="cardHolder"
					                 placeholder="владельца"/>
				</div>
				<div className="row">
					<div className="row rowDropDown">
						<DropDown list={months} setSelectionOption={props.data.setSelectedMonth} selectionOption={props.data.selectedMonth} form/>
						<DropDown list={years} setSelectionOption={props.data.setSelectedYear} selectionOption={props.data.selectedYear} form/>
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