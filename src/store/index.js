import {applyMiddleware, combineReducers, createStore} from "redux";
import {productsReducer} from "./productsReducer";
import {composeWithDevTools} from "@redux-devtools/extension";
import thunk from "redux-thunk";
import {cartReducer} from "./cartReducer";
import {productsFiltersReducer} from "./filtersReducer";

const rootReducer = combineReducers({
	productsReducer,
	cartReducer,
	productsFiltersReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))