import React, {useRef} from 'react';
import Card from "../compontents/Card/Card";
import {ArrowDown} from "../assets/ArrowDown";
import DropDown from "../compontents/DropDown/DropDown";
import {ArrowScroll} from "../assets/ArrowScroll";

// Запрос для каталога(все товары)
const products = [
	{
		id: 1,
		imgUrl: '../img/products/1.png',
		title: 'Беспроводная компьютерная гарнитура Logitech G G435, черный/неоновый желтый',
		price: 8500,
		sale: 6800
	},
	{
		id: 2,
		imgUrl: '../img/products/2.png',
		title: 'Компьютерный корпус Deepcool CK500 WH белый',
		price: 7200
	},
	{
		id: 3,
		imgUrl: '../img/products/3.png',
		title: 'Наушники Beyerdynamic DT 990 PRO, черный',
		price: 15750,
		sale: 27430
	},
	{
		id: 4,
		imgUrl: '../img/products/4.png',
		title: 'Фен Xiaomi Mi Ionic Hair Dryer H300 EU CMJ02ZHM (BHR5081GL)',
		price: 2580,
		sale: 2890
	},
	{
		id: 5,
		imgUrl: '../img/products/5.png',
		title: 'Беспроводная компактная мышь Xiaomi Wireless Mouse Lite, черный',
		price: 625,
		sale: 920
	},
	{
		id: 6,
		imgUrl: '../img/products/6.png',
		title: 'Умная колонка Яндекс Станция Мини без часов с Алисой, серый опал, 10Вт',
		price: 5990,
		sale: 6990
	}
]


const Home = () => {
	const scrollToRef = useRef(null);
	
	function handleClick() {
		scrollToRef.current.scrollIntoView({behavior: 'smooth'})
	}
	return (
		<main className="page home">
			<section className="hero">
				<div className="container heroContainer">
					<div className="heroContent">
						<h1 className="heroTitle">Digital Dreams</h1>
						<p className="heroText">Превращаем цифровые мечты в реальность</p>
						<span onClick={handleClick} className="heroScroll"><ArrowScroll/></span>
					</div>
				</div>
			</section>
			<section ref={scrollToRef} className="catalog">
				<div className="container">
					<div className="catalogContent">
						<div className="catalogTop">
							<h3 className="catalogTitle">Каталог</h3>
							<div className="catalogFilters">
								<div className="catalogFilter">Фильтры</div>
								<DropDown/>
							</div>
						</div>
						<div className="catalogProducts">
							{products.map((product) => (
								<Card key={product.id} product={product}/>
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Home;