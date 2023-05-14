import axios from "axios";
import {addManyProductsAction} from "../store/productsReducer";

export const axiosProducts = () => {
	return async function (dispatch) {
		try {
			await axios.get('https://645e82ea8d08100293016ab6.mockapi.io/products')
				.then(resp => dispatch(addManyProductsAction(resp.data)))
		} catch (e) {
			console.error('Error products storage: ', e.message)
		}
	}
}