import React, {useEffect, useRef, useState} from 'react';
import Card from "../compontents/Card/Card";
import DropDown from "../compontents/DropDown/DropDown";
import {ArrowScroll} from "../assets/ArrowScroll";
import FilterDropDown from "../compontents/FilterDropDown/FilterDropDown";
import {useDispatch, useSelector} from "react-redux";
import {Filter} from "../assets/Filter";
import Drawer from "../compontents/Drawer/Drawer";

const sortedList = [
	'По возрастанию цены',
	'По убыванию цены',
	'По названию'
]
const filters = [
	{
		title: 'Цвет',
		options: [
			'Чёрный',
			'Белый',
			'Красный'
		]
	},
	{
		title: 'Бренд',
		options: [
			'Xiaomi',
			'Deepcool',
			'Яндекс'
		]
	},
	{
		title: 'Размер',
		options: [
			'Чёрный',
			'Белый',
			'Красный'
		]
	}
]

const Home = () => {
	const [drawerOpened, setDrawerOpened] = useState(true);

	// Все товары в каталоге
	const products = useSelector(state => state.productsReducer.products)
	
	// До куда проскролит
	const scrollToRef = useRef(null);
	
	// клик по стрелке до hero
	function handleClick() {
		scrollToRef.current.scrollIntoView({behavior: 'smooth'})
	}
	
	return (
		<main className="page home">
			{drawerOpened && <Drawer content={{sortedList, filters}} drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened}/>}
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
								{filters.map((filter) => (
									<FilterDropDown key={filter.title} title={filter.title} list={filter.options}/>
								))}
								<DropDown list={sortedList}/>
							</div>
							<div className="catalogMenuFilters">
								<div onClick={() => setDrawerOpened(!drawerOpened)} className="catalogMenuFiltersTop"><Filter/> <span>Фильтры</span></div>
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