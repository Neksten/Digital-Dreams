import Header from "./compontents/Header/Header";
import Footer from "./compontents/Footer/Footer";
import Home from "./Pages/Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Cart from "./Pages/Cart";
import {useEffect} from "react";
import {axiosProducts} from "./asyncActions/products";
import {axiosCartProducts} from "./asyncActions/cart";
import {useDispatch} from "react-redux";


function App() {
  const dispatch = useDispatch()
  
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
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
