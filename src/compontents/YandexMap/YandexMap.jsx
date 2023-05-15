import {YMaps, Map, ZoomControl, Placemark} from '@pbe/react-yandex-maps';
import { useState } from "react";
import styles from "../CustomInputForm/CustomInputForm.module.scss";
import React from "react";
import OutsideClickHandler from "../OutsideClickHandler";

const addresses = [
	'ЦУМ, улица Гончарова, 21, Ульяновск, 432000',
	'ЯндексМаркет, улица Гончарова, 28/13, Ульяновск, 432000',
	'Mediasoft, улица Кирова, 28, Ульяновск, 432048'
]

const YandexMap = () => {
	const [address, setAddress] = useState('')
	const [value, setValue] = useState('')
	const [hideList, setHideList] = useState(false)
	const [addressesList, setAddressesList] = useState(addresses)
	
	const handlePlacemarkClickCoom = () => {
		const text = 'ЦУМ, улица Гончарова, 21, Ульяновск, 432000'
		setAddress(text)
		setValue(text)
	};
	const handlePlacemarkClickYam = () => {
		const text = 'ЯндексМаркет, улица Гончарова, 28/13, Ульяновск, 432000'
		setAddress(text)
		setValue(text)
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
	}
	
	// поиск по адресам
	function searchInput(e) {
		setValue(e.target.value)
		setAddressesList(addresses)
		if (e.target.value.length > 0) {
			setAddressesList(addresses.filter(i => i.toLowerCase().includes(value.toLowerCase())))
		}
	}
	return (
		<div className="map">
			<div className={styles.customInput}>
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
					<div className="addresses">
						{addressesList.map(i => (
							<div onClick={() => onClickItemList(i)} className="address">{i}</div>
						))}
					</div>
				</OutsideClickHandler>
			}
			<YMaps
				query={{
					apikey: '2d5c5d27-f61a-4a85-9cab-db9cdfe57168',
				}}
			>
				<div>
					<Map
						defaultState={{
							center: [54.319742, 48.395900],
							zoom: 15,
							controls: [],
						}}
						width='500px'
						height="500px"
					>
						<ZoomControl options={{ float: "right" }} />
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
