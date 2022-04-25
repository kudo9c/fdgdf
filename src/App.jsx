import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { useSelector } from "react-redux";
import "./app.css"
import CheckOut from "./pages/CheckOut"
import NotFound from "./pages/NotFound";
import Info from "./pages/Info";
import AllProducts from "./pages/AllProducts";
import Favorite from "./pages/Favorite";
const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products/:category" element={<ProductList/>}/>
        <Route path="/products" element={<AllProducts/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<CheckOut/>}/>
        <Route path="/info" element={<Info/>}/>
        <Route path="/favor" element={<Favorite/>}/>

        <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/> 
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
};

export default App;