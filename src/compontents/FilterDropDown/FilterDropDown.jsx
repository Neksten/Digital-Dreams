import React from 'react';
import styles from './FilterDropDown.module.scss';
import OutsideClickHandler from "../OutsideClickHandler";
import {ArrowDown} from "../../assets/ArrowDown";
import {useState} from "react";
import FilterDropDownItem from "./FilterDropDownItem";


const FilterDropDown = (props) => {
	const [isOpen, setIsOpen] = useState(false)
	const options = props.list
	
	// открытие/закрытие
	function toggleDropdown() {
		setIsOpen(!isOpen)
	}
	
	return (
		<div className={styles.filterDropdown}>
			<OutsideClickHandler onOutsideClick={setIsOpen}>
				<div onClick={toggleDropdown} className={styles.top}>{props.title}  <span><ArrowDown/></span></div>
				{isOpen &&
					<div className={styles.body}>
						<ul>
							{options.map((option => (
								<FilterDropDownItem selectedOptions={props.selectedOptions}
								                    addOptionFilter={props.addOptionFilter}
								                    removeOptionFilter={props.removeOptionFilter}
								                    key={option}
								                    option={option}
								                    title={props.title}
								/>
							)))}
						</ul>
					</div>
				}
			</OutsideClickHandler>
		</div>
	);
};

export default FilterDropDown;