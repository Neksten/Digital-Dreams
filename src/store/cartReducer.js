const defaultState = {
	cart: []
}

const ADD_MANY_CART_PRODUCTS = 'ADD_MANY_CART_PRODUCTS'
const ADD_CART = 'ADD_CART'
const REMOVE_CART = 'REMOVE_CART'
const REMOVE_All_CART = 'REMOVE_All_CART'
const UPDATE_COUNT_INCREMENT_CART = 'UPDATE_COUNT_INCREMENT_CART'
const UPDATE_COUNT_DECREMENT_CART = 'UPDATE_COUNT_DECREMENT_CART'

export const cartReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_MANY_CART_PRODUCTS:
			return {...state, cart: [...action.payload]}
		case ADD_CART:
			return {...state, cart: [...state.cart, action.payload]}
		case REMOVE_CART:
			return {...state, cart: [...state.cart.filter(product => product.id !== action.payload)]}
		case REMOVE_All_CART:
			return {...state, cart: []}
		case UPDATE_COUNT_INCREMENT_CART:
			const updatedCartIncrement = state.cart.map(product => product.id === action.payload
				? {...product, count: product.count + 1}
				: product
			)
			return {...state, cart: updatedCartIncrement}
		case UPDATE_COUNT_DECREMENT_CART:
			const updatedCartDecrement = state.cart.map(product => product.id === action.payload
				? {...product, count: product.count - 1}
				: product
			)
			return {...state, cart: updatedCartDecrement}
		default:
			return state
	}
}

export const addManyCartProductsReducerAction = (payload) => ({type: ADD_MANY_CART_PRODUCTS, payload})
export const addCartReducerAction = (payload) => ({type: ADD_CART, payload})
export const removeCartReducerAction = (payload) => ({type: REMOVE_CART, payload})
export const removeAllCartReducerAction = (payload) => ({type: REMOVE_All_CART, payload})
export const updateCountCartIncrementReducerAction = (payload) => ({type: UPDATE_COUNT_INCREMENT_CART, payload})
export const updateCountCartDecrementReducerAction = (payload) => ({type: UPDATE_COUNT_DECREMENT_CART, payload})