import {
	addCartReducerAction,
	addManyCartProductsReducerAction,
	removeCartReducerAction, updateCountCartDecrementReducerAction, updateCountCartIncrementReducerAction
} from "../store/cartReducer";

// get запрос с будущего бэка
export const axiosCartProducts = () => {
	return async function (dispatch) {
		try {
			const cart = await JSON.parse(localStorage.getItem('cart'))
			dispatch(addManyCartProductsReducerAction(cart))
		} catch (e) {
			console.error('Error cart storage: ', e.message)
		}
	}
}

// post запрос добавления в корзину на будущий бэк
export const axiosAddCartProduct = (product) => {
	return async function (dispatch) {
		try {
			// вся корзина
			const cart = await JSON.parse(localStorage.getItem('cart'))
			
			// новый элемент
			const newProduct = {
				id: product.id,
				retailPrice: product.retailPrice,
				discountPrice: product.discountPrice,
				count: 1
			}
			// корина с новым элементом
			const updatedCart = [
				newProduct,
				...cart
			]
			
			//post запрос, добавляющий товар в корзину
			await localStorage.setItem('cart', JSON.stringify(updatedCart))
			
			dispatch(addCartReducerAction(newProduct))
		} catch (e) {
			console.error('Error carts storage: ', e.message)
		}
	}
}

// delete запрос удаления из корзины на будущем бэке
export const axiosRemoveCartProduct = (id) => {
	return async function (dispatch) {
		try {
			// вся корзина
			const cart = await JSON.parse(localStorage.getItem('cart'))
			
			// корзина без удалённого элемента
			const updatedCart = cart.filter(i => i.id !== id)
			
			await localStorage.setItem('cart', JSON.stringify(updatedCart))
			dispatch(removeCartReducerAction(id))
		} catch (e) {
			console.error('Error carts remove: ', e.message)
		}
	}
}

// post запрос с изменением count++ на будущем бэке
export const axiosProductCountIncrementClick = (id) => {
	return async function (dispatch) {
		try {
			// вся корзина
			const cart = await JSON.parse(localStorage.getItem('cart'))
			
			const updatedCart = cart.map(i => i.id === id
				? {...i, count: i.count + 1}
				: i
			)
			
			await localStorage.setItem('cart', JSON.stringify(updatedCart))
			dispatch(updateCountCartIncrementReducerAction(id))
		} catch (e) {
			console.error('Error increment card', e.message)
		}
	}
}

// post запрос с изменением count-- на будущем бэке
export const axiosProductCountDecrementClick = (id) => {
	return async function (dispatch) {
		try {
			// вся корзина
			const cart = await JSON.parse(localStorage.getItem('cart'))
			
			const updatedCart = cart.map(i => i.id === id
				? {...i, count: i.count - 1}
				: i
			)
			
			await localStorage.setItem('cart', JSON.stringify(updatedCart))
			dispatch(updateCountCartDecrementReducerAction(id))
		} catch (e) {
			console.error('Error increment card', e.message)
		}
	}
}