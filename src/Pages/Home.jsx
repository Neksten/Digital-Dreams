import React, {useEffect, useRef, useState} from 'react';
import Card from "../compontents/Card/Card";
import DropDown from "../compontents/DropDown/DropDown";
import {ArrowScroll} from "../assets/ArrowScroll";
import {useDispatch, useSelector} from "react-redux";
import {Filter} from "../assets/Filter";
import {
	ascendingPricesProductsAction,
	byNameProductsAction,
	descendingPricesProductsAction,
} from "../store/filtersReducer";
import FilterList from "../compontents/FilterList";

const sortedList = [
	'По названию',
	'По возрастанию цены',
	'По убыванию цены',
]

const Home = () => {
	const dispatch = useDispatch()
	// Все отфильтрованные товары
	const productsFilters = useSelector(state => state.productsFiltersReducer.filteredProducts)
	
	const [drawerOpened, setDrawerOpened] = useState(true);
	// сортировка по названию и тд
	const [sortedSelectionOption, setSortedSelectionOption] = useState('По названию')
	
	// До куда проскролит
	const scrollToRef = useRef(null);
	
	// клик по стрелке до hero
	function handleClick() {
		scrollToRef.current.scrollIntoView({behavior: 'smooth'})
	}
	
	// по кнопки сортировать
	useEffect(() => {
		switch (sortedSelectionOption) {
			case 'По названию':
				// Сортировка по названию
				dispatch(byNameProductsAction())
				break
			case 'По возрастанию цены':
				// Сортировка по возрастанию цены
				dispatch(descendingPricesProductsAction())
				break
			case 'По убыванию цены':
				// Сортировка по убыванию
				dispatch(ascendingPricesProductsAction())
				break
		}
	}, [sortedSelectionOption])
	
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
								<FilterList/>
								<DropDown list={sortedList} selectionOption={sortedSelectionOption} setSelectionOption={setSortedSelectionOption}/>
							</div>
							<div className="catalogMenuFilters">
								<div onClick={() => setDrawerOpened(!drawerOpened)} className="catalogMenuFiltersTop"><Filter/> <span>Фильтры</span></div>
							</div>
						</div>
						<div className="catalogProducts">
							{productsFilters.map((product) => (
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