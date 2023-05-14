import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store";

// если нету корзины, то создать пустую
if (!localStorage.getItem('cart')) {
	localStorage.setItem('cart', JSON.stringify([]))
}
if (!localStorage.getItem('products')) {
	const products = [
		{    id: 1,
			imgUrl: "../img/products/1.png",
			title: "Беспроводная компьютерная гарнитура Logitech G G435, черный/неоновый желтый",
			retailPrice: 8500,
			discountPrice: 6800,
			brand: "Logitech"
		},
		{    id: 2,
			imgUrl: "../img/products/2.png",
			title: "Компьютерный корпус Deepcool CK500 WH белый",
			discountPrice: 7200,
			brand: "Deepcool "
		},
		{    id: 3,
			imgUrl: "../img/products/3.png",
			title: "Наушники Beyerdynamic DT 990 PRO, черный",
			retailPrice: 27430,
			discountPrice: 15750,
			brand: "Beyerdynamic"
		},
		{    id: 4,
			imgUrl: "../img/products/4.png",
			title: "Фен Xiaomi Mi Ionic Hair Dryer H300 EU CMJ02ZHM (BHR5081GL)",
			retailPrice: 2890,
			discountPrice: 2580,
			brand: "Xiaomi"
		},
		{    id: 5,
			imgUrl: "../img/products/5.png",
			title: "Беспроводная компактная мышь Xiaomi Wireless Mouse Lite, черный",
			retailPrice: 920,
			discountPrice: 625,
			brand: "Xiaomi"
		},
		{    id: 6,
			imgUrl: "../img/products/6.png",
			title: "Умная колонка Яндекс Станция Мини без часов с Алисой, серый опал, 10Вт",
			retailPrice: 6990,
			discountPrice: 5990,
			brand: "Яндекс"
		}
	]
	
	localStorage.setItem('products', JSON.stringify(products))
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
