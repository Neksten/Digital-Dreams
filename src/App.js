import Header from "./compontents/Header/Header";
import Footer from "./compontents/Footer/Footer";
import Home from "./Pages/Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Cart from "./Pages/Cart";

function App() {
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
