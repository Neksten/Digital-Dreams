import {products} from "../localdata";

const defaultState = {
	products: localStorage.getItem('products')
		? JSON.parse(localStorage.getItem('products'))
		: [...products],
	filteredProducts: [],
	filters: {
		brands: [],
		colors: []
	},
	sortBy: null, // для хранения выбранной сортировки
}
const BY_NAME = 'BY_NAME'
const DESCENDING_PRICES = 'DESCENDING_PRICES'
const ASCENDING_PRICES = 'ASCENDING_PRICES'
const FILTERED_PRODUCTS = 'FILTERED_PRODUCTS'

const ADD_BRAND_FILTER = 'ADD_BRAND_FILTER'
const REMOVE_BRAND_FILTER = 'REMOVE_BRAND_FILTER'

const ADD_COLOR_FILTER = 'ADD_COLOR_FILTER'
const REMOVE_COLOR_FILTER = 'REMOVE_COLOR_FILTER'
const ALL_REMOVE_FILTERS = 'ALL_REMOVE_FILTERS'

export const productsFiltersReducer = (state = defaultState, action) => {
	switch (action.type) {
		case BY_NAME:
			// Сортировка по названию
			return {...state, sortBy: BY_NAME,
				filteredProducts: state.filteredProducts.length === 0
					? [...state.products].sort((a, b) => a.title.localeCompare(b.title))
					: [...state.filteredProducts].sort((a, b) => a.title.localeCompare(b.title))
			}
		case DESCENDING_PRICES:
			// Сортировка по возрастанию цены
			return {...state, sortBy: DESCENDING_PRICES, filteredProducts: [...state.filteredProducts].sort((a, b) => a.discountPrice - b.discountPrice)};
		case ASCENDING_PRICES:
			// Сортировка по убыванию
			return {...state, sortBy: ASCENDING_PRICES, filteredProducts: [...state.filteredProducts].sort((a, b) => b.discountPrice - a.discountPrice)};
		case ADD_BRAND_FILTER:
			// добавить фильтр бренда
			return {
				...state,
				filters: {
					...state.filters,
					brands: [...state.filters.brands, action.payload],
				},
			};
		case REMOVE_BRAND_FILTER:
			// удалить фильтр бренда
			if (state.filters.brands.includes(action.payload)) {
				return {
					...state,
					filters: {
						...state.filters,
						brands: state.filters.brands.filter((brand) => brand !== action.payload),
					},
				};
			} else {
				return state;
			}
		case ADD_COLOR_FILTER:
			// добавить фильтр цвета
			return {
				...state,
				filters: {
					...state.filters,
					colors: [...state.filters.colors, action.payload],
				},
			};
		case REMOVE_COLOR_FILTER:
			// удалить фильтр цвета
			if (state.filters.colors.includes(action.payload)) {
				return {
					...state,
					filters: {
						...state.filters,
						colors: state.filters.colors.filter((brand) => brand !== action.payload),
					},
				};
			} else {
				return state;
			}
		case ALL_REMOVE_FILTERS:
			// удалить все фильтры
			return {...state, filteredProducts: [...state.products].sort((a, b) => a.title.localeCompare(b.title)), filters: {brands: [], colors: []}}
		case FILTERED_PRODUCTS:
			let filteredProducts = [...state.products];
			
			// если есть фильтры по брендам и цветам
			if (state.filters.brands.length > 0 && state.filters.colors.length > 0) {
				filteredProducts = filteredProducts.filter(
					(product) =>
						state.filters.brands.includes(product.brand.toLowerCase()) &&
						state.filters.colors.includes(product.color.toLowerCase())
				);
			} else if (state.filters.brands.length > 0) {
				// если только бренды
				filteredProducts = filteredProducts.filter((product) =>
					state.filters.brands.includes(product.brand.toLowerCase())
				);
			} else if (state.filters.colors.length > 0) {
				// если только цвета
				filteredProducts = filteredProducts.filter((product) =>
					state.filters.colors.includes(product.color.toLowerCase())
				);
			}
			
			if (state.sortBy === ASCENDING_PRICES) {
				filteredProducts.sort((a, b) => b.discountPrice - a.discountPrice);
			} else if (state.sortBy === DESCENDING_PRICES) {
				filteredProducts.sort((a, b) => a.discountPrice - b.discountPrice);
			} else if (state.sortBy === BY_NAME) {
				filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
			}
			
			return { ...state, filteredProducts };
		default:
			return state
	}
}

export const byNameProductsAction = (payload) => ({type: BY_NAME, payload})
export const descendingPricesProductsAction = (payload) => ({type: DESCENDING_PRICES, payload})
export const ascendingPricesProductsAction = (payload) => ({type: ASCENDING_PRICES, payload})
export const filteredProductsAction = (payload) => ({type: FILTERED_PRODUCTS, payload})
export const addBrandFilterProductsAction = (payload) => ({type: ADD_BRAND_FILTER, payload})
export const removeBrandFilterProductsAction = (payload) => ({type: REMOVE_BRAND_FILTER, payload})
export const addColorFilterProductsAction = (payload) => ({type: ADD_COLOR_FILTER, payload})
export const allRemoveFiltersProductsAction = (payload) => ({type: ALL_REMOVE_FILTERS, payload})
export const removeColorFilterProductsAction = (payload) => ({type: REMOVE_COLOR_FILTER, payload})