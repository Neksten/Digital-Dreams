import {applyMiddleware, combineReducers, createStore} from "redux";
import {productsReducer} from "./productsReducer";
import {composeWithDevTools} from "@redux-devtools/extension";
import thunk from "redux-thunk";
import {cartReducer} from "./cartReducer";

const rootReducer = combineReducers({
	productsReducer,
	cartsReducer: cartReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))