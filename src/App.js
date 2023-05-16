import Header from "./compontents/Header/Header";
import Footer from "./compontents/Footer/Footer";
import Home from "./Pages/Home/Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Cart from "./Pages/Cart/Cart";
import {useEffect} from "react";
import {axiosProducts} from "./asyncActions/products";
import {axiosCartProducts} from "./asyncActions/cart";
import {useDispatch} from "react-redux";
import Order from "./Pages/Order/Order";
import CartContext from "./context";
import {useState} from "react";


function App() {
  const dispatch = useDispatch()
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalSale, setTotalSale] = useState(0)
  
  // высчитывает цену и скиду после загрузки данных с корзины
  function calculateTotalPrices(cartProducts) {
    const totalPrice = cartProducts.reduce((acc, el) => acc + (el.discountPrice * el.count), 0);
    const totalSale = cartProducts.reduce((acc, el) => el.retailPrice ? acc + ((el.retailPrice - el.discountPrice) * el.count) : acc + 0, 0);
    return { totalPrice, totalSale };
  }
  
  useEffect(() => {
    // грузим с localstorage корзину и продукты
    dispatch(axiosProducts())
    dispatch(axiosCartProducts())
  }, [])
  
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={
            <CartContext.Provider value={
              {
                totalPrice,
                setTotalPrice,
                totalSale,
                setTotalSale,
                calculateTotalPrices
              }
            }>
              <Cart/>
            </CartContext.Provider>
          }/>
          <Route path="/order" element={
            <CartContext.Provider value={
              {
                totalPrice,
                setTotalPrice,
                totalSale,
                setTotalSale,
                calculateTotalPrices
              }
            }>
              <Order/>
            </CartContext.Provider>
          }/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
