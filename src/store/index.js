import {applyMiddleware, combineReducers, createStore} from "redux";
import {productsReducer} from "./productsReducer";
import {composeWithDevTools} from "@redux-devtools/extension";
import thunk from "redux-thunk";
import {cartsReducer} from "./cartsReducer";

const rootReducer = combineReducers({
	productsReducer,
	cartsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))