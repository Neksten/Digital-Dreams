import {addManyProductsAction} from "../store/productsReducer";

export const axiosProducts = () => {
	return async function (dispatch) {
		try {
			const products = await JSON.parse(localStorage.getItem('products'))
			dispatch(addManyProductsAction(products))
		} catch (e) {
			console.error('Error products storage: ', e.message)
		}
	}
}