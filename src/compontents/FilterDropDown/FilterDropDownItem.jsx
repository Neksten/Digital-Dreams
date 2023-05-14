import React, {useState} from 'react';
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";

const FilterDropDownItem = ({option}) => {
	const [selected, setSelected] = useState(false)
	
	function handleOptionClick() {
		setSelected(!selected)
	}
	
	return (
		<li onClick={handleOptionClick}>
			<CustomCheckBox activeParent={selected}/>
			<span>{option}</span>
		</li>
	);
};

export default FilterDropDownItem;