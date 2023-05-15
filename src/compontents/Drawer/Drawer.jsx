import React from 'react';
import {Cross} from "../../assets/Cross";
import FilterDropDown from "../FilterDropDown/FilterDropDown";
import DropDown from "../DropDown/DropDown";

const Drawer = ({content, drawerOpened, setDrawerOpened}) => {
	function closeDrawer() {
		setDrawerOpened(false)
	}
	
	return (
		<div className="drawer">
			<div className="drawerContent">
				<div className="drawerTop">
					<h3 className="drawerTitle">Фильтры</h3>
					<div onClick={closeDrawer} className="drawerClose">
						<Cross/>
					</div>
				</div>
				<div className="drawerBody">
					{content.filters.map((filter) => (
						<FilterDropDown key={filter.title} title={filter.title} list={filter.options}/>
					))}
					<DropDown list={content.sortedList}/>
				</div>
			</div>
		</div>
	);
};

export default Drawer;