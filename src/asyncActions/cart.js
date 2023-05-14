import axios from "axios";
import {addManyCartProductsReducerAction} from "../store/cartsReducer";

export const axiosCartProducts = () => {
	return async function (dispatch) {
		try {
			await axios.get('https://645e82ea8d08100293016ab6.mockapi.io/cart')
				.then(resp => dispatch(addManyCartProductsReducerAction(resp.data)))
		} catch (e) {
			console.error('Error products storage: ', e.message)
		}
	}
}