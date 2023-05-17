import React, {useEffect, useState} from 'react';
import './CustomCheckBox.scss'
import cn from 'classnames'

const CustomCheckBox = ({activeParent}) => {
	const [selected, setSelected] = useState(false)
	
	// При клике на элемент CustomCheckBox
	function handleCheckBoxClick() {
		setSelected(!selected)
	}
	
	// если кликнули по родительскому элементу
	useEffect(() => {
		activeParent ? setSelected(true) : setSelected(false)
	}, [activeParent])
	
	return (
		<div onClick={handleCheckBoxClick} className={cn('customCheckbox', {
			selected: selected
		})}/>
	);
};

export default CustomCheckBox;