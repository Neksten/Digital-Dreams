const defaultState = {
	products: localStorage.getItem('products')
		? JSON.parse(localStorage.getItem('products'))
		: [],
	filteredProducts: [],
	filters: {
		brands: [],
		colors: []
	}
}
const BY_NAME = 'BY_NAME'
const DESCENDING_PRICES = 'DESCENDING_PRICES'
const ASCENDING_PRICES = 'ASCENDING_PRICES'
const FILTERED_PRODUCTS = 'FILTERED_PRODUCTS'

const ADD_BRAND_FILTER = 'ADD_BRAND_FILTER'
const REMOVE_BRAND_FILTER = 'REMOVE_BRAND_FILTER'

const ADD_COLOR_FILTER = 'ADD_COLOR_FILTER'
const REMOVE_COLOR_FILTER = 'REMOVE_COLOR_FILTER'

export const productsFiltersReducer = (state = defaultState, action) => {
	switch (action.type) {
		case BY_NAME:
			// Сортировка по названию
			return {...state, filteredProducts: [...state.products].sort((a, b) => a.title.localeCompare(b.title))};
		case DESCENDING_PRICES:
			// Сортировка по возрастанию цены
			return {...state, filteredProducts: [...state.products].sort((a, b) => a.discountPrice - b.discountPrice)};
		case ASCENDING_PRICES:
			// Сортировка по убыванию
			return {...state, filteredProducts: [...state.products].sort((a, b) => b.discountPrice - a.discountPrice)};
		case ADD_BRAND_FILTER:
			return {
				...state,
				filters: {
					...state.filters,
					brands: [...state.filters.brands, action.payload],
				},
			};
		case REMOVE_BRAND_FILTER:
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
			return {
				...state,
				filters: {
					...state.filters,
					colors: [...state.filters.colors, action.payload],
				},
			};
		case REMOVE_COLOR_FILTER:
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
		case FILTERED_PRODUCTS:
			let filteredProducts = [...state.products];
			if (state.filters.brands.length > 0 && state.filters.colors.length > 0) {
				filteredProducts = filteredProducts.filter(
					(product) =>
						state.filters.brands.includes(product.brand.toLowerCase()) &&
						state.filters.colors.includes(product.color.toLowerCase())
				);
			} else if (state.filters.brands.length > 0) {
				filteredProducts = filteredProducts.filter((product) =>
					state.filters.brands.includes(product.brand.toLowerCase())
				);
			} else if (state.filters.colors.length > 0) {
				filteredProducts = filteredProducts.filter((product) =>
					state.filters.colors.includes(product.color.toLowerCase())
				);
			}
			
			if (state.sortBy === ASCENDING_PRICES) {
				filteredProducts.sort((a, b) => a.discountPrice - b.discountPrice);
			} else if (state.sortBy === DESCENDING_PRICES) {
				filteredProducts.sort((a, b) => b.discountPrice - a.discountPrice);
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
export const removeColorFilterProductsAction = (payload) => ({type: REMOVE_COLOR_FILTER, payload})