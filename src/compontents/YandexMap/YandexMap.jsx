import React from "react";
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import { useState } from "react";
import stylesInput from "../CustomInputForm/CustomInputForm.module.scss";
import OutsideClickHandler from "../OutsideClickHandler";
import styles from './YandexMap.module.scss'

const addresses = [
	'ЦУМ, улица Гончарова, 21, Ульяновск',
	'ЯндексМаркет, улица Гончарова, 28/13, Ульяновск',
	'Mediasoft, улица Карла Маркса, 13Ак3'
]

const YandexMap = ({value, setValue, setAddressValid}) => {
	const [address, setAddress] = useState('')
	const [hideList, setHideList] = useState(false)
	const [addressesList, setAddressesList] = useState(addresses)
	
	const handlePlacemarkClickCoom = () => {
		const text = 'ЦУМ, улица Гончарова, 21, Ульяновск, 432000'
		setAddress(text)
		setValue(text)
		setAddressValid(true)
	};
	const handlePlacemarkClickYam = () => {
		const text = 'ЯндексМаркет, улица Гончарова, 28/13, Ульяновск, 432000'
		setAddress(text)
		setValue(text)
		setAddressValid(true)
	};
	const handlePlacemarkClickMed = () => {
		const text = 'Mediasoft, улица Кирова, 28, Ульяновск, 432048'
		setAddress(text)
		setValue(text)
	};
	
	// клик по адресу
	function onClickItemList(address) {
		setValue(address)
		setAddress(address)
		setAddressValid(true)
	}
	
	// поиск по адресам
	function searchInput(e) {
		setValue(e.target.value)
		setAddressesList(addresses)
		if (e.target.value.length > 0) {
			setAddressesList(addresses.filter(i => i.toLowerCase().includes(value.toLowerCase())))
		}
		// при вводе валидного адреса с клавиатуры
		if (addressesList.some(i => i === e.target.value)) {
			setAddressValid(true)
		} else {
			setAddressValid(false)
		}
	}
	return (
		<div className={styles.map}>
			<div className={stylesInput.customInput}>
				<label htmlFor={address}>Адрес *</label>
				<input value={value}
				       onChange={searchInput}
				       onClick={() => setHideList(true)}
				       type="text"
				       placeholder='Введите адрес'
				/>
			</div>
			{hideList &&
				<OutsideClickHandler onOutsideClick={setHideList}>
					<div className={styles.addresses}>
						{addressesList.map(i => (
							<div key={i} onClick={() => onClickItemList(i)} className={styles.address}>{i}</div>
						))}
					</div>
				</OutsideClickHandler>
			}
			<YMaps
				query={{
					apikey: '2d5c5d27-f61a-4a85-9cab-db9cdfe57168',
				}}
			>
				<div className={styles.mapContainer}>
					<Map
						defaultState={{
							center: [54.319742, 48.395900],
							zoom: 15,
							controls: [],
						}}
						width='100%'
						height="500px"
					>
						<Placemark geometry={[54.319742, 48.395900]} onClick={handlePlacemarkClickMed}/>
						<Placemark geometry={[54.318297, 48.396636]} onClick={handlePlacemarkClickCoom}/>
						<Placemark geometry={[54.316338, 48.396079]} onClick={handlePlacemarkClickYam}/>
					</Map>
				</div>
			</YMaps>
		</div>
	);
};

export default YandexMap;
