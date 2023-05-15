import React, {useRef, useState} from 'react';
import styles from './CustomInputForm.module.scss'

const CustomInputForm = ({name, htmlFor, action, placeholder, value, setValue, setFlipped}) => {
	const [textError, setTextError] = useState('')
	
	const inputRef = useRef()
	
	function inputClick(e) {
		e.currentTarget.style.borderBottom = '1px solid #000'
		inputRef.current.focus()
		
		switch (action) {
			case 'phone':
				value.length === 0 && setValue('+7')
				break
			case 'cardCvv':
				setFlipped(true)
				break
			default:
				setTextError('')
		}
	}
	const onChangeInput = (e) => {
		const { value } = e.target;
		switch(action) {
			case 'userName':
				if (/^[a-zA-Z]+$/.test(value)) {
					setValue(value);
				}
				break;
			case 'userSurname':
				if (/^[a-zA-Z]+$/.test(value)) {
					setValue(value);
				}
				break;
			case 'phone':
				if (value.length <= 11 && /^\d+$/.test(value.slice(1))) {
					setValue(value)
				}
				break
			case 'cardNumber':
				if (value.length <= 16 && /^\d+$/.test(value)) {
					setValue(value);
				}
				break;
			case 'cardHolder':
				if (value.length <= 20 && /^[a-zA-Z]+$/.test(value)) {
					setValue(value);
				}
				break;
			case 'cardCvv':
				if (value.length <= 4 && /^\d+$/.test(value)) {
					setValue(value);
				}
				break;
			default:
				setValue(value);
		}
	};
	
	const errorStatus = (text) => {
		setTextError(text)
		inputRef.current.style.borderBottom = '1px solid #c20000'
	}
	
	function onBlurCustomInput() {
		switch (action) {
			case 'phone':
				if (value.length !== 11 && value.length > 0) {
					errorStatus('Номер телефона должен состоять из 11 цифр.')
				} else if (value.length === 0) {
					errorStatus('Введите ваш номер')
				}
				break
			case 'email':
				const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
				!valid && errorStatus('Введите почту правильно');
				break
			case 'cardCvv':
				setFlipped(false)
				break
			default:
				break
		}
	}
	
	
	
	return (
		<div className={styles.customInput}>
			<label htmlFor={htmlFor}>{name}*</label>
			<input ref={inputRef}
			       value={value}
			       onChange={onChangeInput}
			       onFocus={(e) => inputClick(e)}
			       onBlur={onBlurCustomInput}
			       type="text"
			       placeholder={`Введите ${placeholder && placeholder.toLowerCase()}`}
			       id={"userName"}
			       name={"userName"}
			/>
			{textError && <span className={styles.error}>{textError}</span>}
		</div>
	);
};

export default CustomInputForm;