import React, {useState} from 'react';
import styles from './DropDown.module.scss'
import {ArrowDown} from "../../assets/ArrowDown";
import OutsideClickHandler from "../OutsideClickHandler";
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

const DropDown = (props) => {
	const [isOpen, setIsOpen] = useState(false)
	
	const options = props.list
	
	// Открытие/закрытие dropdown
	function toggleDropdown() {
		setIsOpen(!isOpen)
	}
	// При клике на элемент dropdown
	function handleOptionClick(option) {
		props.setSelectionOption(option)
		setIsOpen(false)
	}
	
	return (
		<div className={cx(`${styles.dropdown}`, {
			form: props.form,
		})}>
			<OutsideClickHandler onOutsideClick={setIsOpen}>
				<div onClick={toggleDropdown} className={styles.top}>{props.selectionOption} <span><ArrowDown/></span></div>
				{isOpen &&
					<div className={styles.body}>
						<ul>
							{options.map((option => (
								<li key={option} onClick={() => handleOptionClick(option)}>
									<span>{option}</span>
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