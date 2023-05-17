import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store";
import {products} from "./localdata";

// если нету корзины, то создать пустую
if (!localStorage.getItem('cart')) {
	localStorage.setItem('cart', JSON.stringify([]))
}
if (!localStorage.getItem('products')) {
	localStorage.setItem('products', JSON.stringify(products))
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	  <Provider store={store}>
		  <App />
	  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
