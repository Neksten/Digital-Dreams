import React, {useEffect, useState} from 'react';
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";

const FilterDropDownItem = ({option, addOptionFilter, removeOptionFilter, selectedOptions, title}) => {
	const [selected, setSelected] = useState(false)
	
	// активный/неактивный
	function handleOptionClick() {
		setSelected(!selected)
		
		if (selected) {
			removeOptionFilter(option.toLowerCase(), title.toLowerCase())
		} else {
			addOptionFilter(option.toLowerCase(), title.toLowerCase())
		}
	}
	
	useEffect(() => {
		if (selectedOptions.brands.includes(option.toLowerCase())
			|| selectedOptions.colors.includes(option.toLowerCase())
		) {
			setSelected(true)
		}
	}, [selected])
	
	return (
		<li onClick={handleOptionClick}>
			<CustomCheckBox activeParent={selected}/>
			<span>{option}</span>
		</li>
	);
};

export default FilterDropDownItem;