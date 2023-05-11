import React, {useState} from 'react';
import styles from './DropDown.module.scss'
import {ArrowDown} from "../../assets/ArrowDown";
import OutsideClickHandler from "../OutsideClickHandler";

const sortedList = [
	'По возрастанию цены',
	'По убыванию цены',
	'По названию'
]

const DropDown = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectionOption, setSelectedOption] = useState('Сортировать')
	
	const options = sortedList
	// Открытие/закрытие dropdown
	function toggleDropdown() {
		setIsOpen(!isOpen)
	}
	// При клике на элемент dropdown
	function handleOptionClick(option) {
		setSelectedOption(option)
		setIsOpen(false)
	}
	
	return (
		<div className={styles.dropdown}>
			<OutsideClickHandler onOutsideClick={setIsOpen}>
				<div onClick={toggleDropdown} className={styles.top}>{selectionOption} <span><ArrowDown/></span></div>
				{isOpen &&
					<div className={styles.body}>
						<ul>
							{options.map((option => (
								<li key={option} onClick={() => handleOptionClick(option)}>
									{option}
								</li>
							)))}
						</ul>
					</div>
				}
			</OutsideClickHandler>
		</div>
	);
};

export default DropDown;