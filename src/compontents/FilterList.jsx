import React, {useEffect} from 'react';
import FilterDropDown from "./FilterDropDown/FilterDropDown";
import {useDispatch, useSelector} from "react-redux";
import {
	addBrandFilterProductsAction, addColorFilterProductsAction, allRemoveFiltersProductsAction,
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
	const filteredProducts = useSelector(state => state.productsReducer.filteredProducts)
	const filtersActive = useSelector(state => state.productsFiltersReducer.filters)
	
	// Добавить фильтр в активный
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
	// Убрать фильтр из активных
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
		// Отфильтровать продукты если есть выбранные исключающие фильтры
		if (products && filtersActive.length > 0) {
			dispatch(filteredProductsAction(filteredProducts))
		}
	}, [filtersActive, products, filteredProducts])
	
	useEffect(() => {
		dispatch(allRemoveFiltersProductsAction())
	}, [])
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