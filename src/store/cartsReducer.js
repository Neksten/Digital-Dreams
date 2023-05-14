const defaultState = {
	carts: []
}

const ADD_MANY_CART_PRODUCTS = 'ADD_MANY_CART_PRODUCTS'
const ADD_CART = 'ADD_CART'
const REMOVE_CART = 'REMOVE_CART'
const UPDATE_COUNT_CART = 'UPDATE_COUNT_CART'

export const cartsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_MANY_CART_PRODUCTS:
			return {...state, carts: [...action.payload]}
		case ADD_CART:
			return {...state, carts: [...state.carts, action.payload]}
		case REMOVE_CART:
			return {...state, carts: [...state.carts.filter(product => product.id !== action.payload)]}
		case UPDATE_COUNT_CART:
			const updatedCart = state.carts.map(product => product.productId === action.payload.id
				? {...product, count: action.payload.count}
				: product
			)
			// debugger
			return {...state, carts: updatedCart}
		default:
			return state
	}
}

export const addManyCartProductsReducerAction = (payload) => ({type: ADD_MANY_CART_PRODUCTS, payload})
export const addCartReducerAction = (payload) => ({type: ADD_CART, payload})
export const removeCartReducerAction = (payload) => ({type: REMOVE_CART, payload})
export const updateCountCartReducerAction = (payload) => ({type: UPDATE_COUNT_CART, payload})