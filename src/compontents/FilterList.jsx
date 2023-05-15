import React, {useEffect} from 'react';
import FilterDropDown from "./FilterDropDown/FilterDropDown";
import {useDispatch, useSelector} from "react-redux";
import {
	addBrandFilterProductsAction, addColorFilterProductsAction,
	filteredProductsAction, removeBrandFilterProductsAction, removeColorFilterProductsAction,
} from "../store/filtersReducer";

const filters = [
	{
		title: 'Цвет',
		options: [
			'Чёрный',
			'Белый'
		]
	},
	{
		title: 'Бренд',
		options: [
			'Xiaomi',
			'Deepcool',
			'Яндекс',
			'Beyerdynamic',
			'Logitech'
		]
	}
]

const FilterList = () => {
	const dispatch = useDispatch()
	// Все продукты
	const products = useSelector(state => state.productsReducer.products)
	const filtersActive = useSelector(state => state.productsFiltersReducer.filters)
	
	function addOptionFilter(option, title) {
		switch (title) {
			case 'бренд':
				dispatch(addBrandFilterProductsAction(option))
				dispatch(filteredProductsAction())
				break
			case 'цвет':
				dispatch(addColorFilterProductsAction(option))
				dispatch(filteredProductsAction())
				break
		}
	}
	function removeOptionFilter(option, title) {
		switch (title) {
			case 'бренд':
				dispatch(removeBrandFilterProductsAction(option))
				dispatch(filteredProductsAction())
				break
			case 'цвет':
				dispatch(removeColorFilterProductsAction(option))
				dispatch(filteredProductsAction())
				break
		}
	}
	
	useEffect(() => {
		console.log(filtersActive)
		if (products && filtersActive.length > 0) {
			dispatch(filteredProductsAction(products))
			// dispatch(filteredProductsAction())
		}
	}, [filtersActive, products])
	
	return (
		<>
			{filters.map((filter) => (
				<FilterDropDown selectedOptions={filtersActive}
				                addOptionFilter={addOptionFilter}
				                removeOptionFilter={removeOptionFilter}
				                key={filter.title}
				                title={filter.title}
				                list={filter.options}
				/>
			))}
		</>
	);
};

export default FilterList;