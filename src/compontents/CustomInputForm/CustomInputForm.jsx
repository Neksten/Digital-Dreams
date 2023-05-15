import React, {useRef, useState} from 'react';
import styles from './CustomInputForm.module.scss'

const CustomInputForm = ({name, htmlFor, action}) => {
	const [value, setValue] = useState('')
	const [textError, setTextError] = useState('')
	
	const inputRef = useRef()
	
	function inputClick(e) {
		e.currentTarget.style.borderBottom = '1px solid #000'
		inputRef.current.focus()
		
		switch (action) {
			case 'phone':
				value.length === 0 && setValue('+7')
				break
			default:
				setTextError('')
		}
	}
	
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
			default:
				break
		}
	}
	
	
	
	return (
		<div className={styles.customInput}>
			<label htmlFor={htmlFor}>{name}*</label>
			<input ref={inputRef}
			       value={value}
			       onChange={e => setValue(e.target.value)}
			       onFocus={(e) => inputClick(e)}
			       onBlur={onBlurCustomInput}
			       type="text"
			       placeholder={`Введите ${name.toLowerCase()}`}
			       id={"userName"}
			       name={"userName"}
			/>
			{textError && <span className={styles.error}>{textError}</span>}
		</div>
	);
};

export default CustomInputForm;