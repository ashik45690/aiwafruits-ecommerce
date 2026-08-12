import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Protuctroute } from "./components/ProtectRoute";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import MyOrders from "./pages/Myorders";
import OrderDetails from "./components/myOrders/OrderDetails";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<LoginPage />} />
         <Route path="/user-Register" element={<RegisterPage/>} />
         <Route path="/product-Page" element={<ProductPage/>}/>
         <Route path="/Cart-items" element={<CartPage/>}/>
         <Route path="/Check-out" element={<CheckoutPage/>}/>
         <Route path="/Myorders" element={<MyOrders/>}/>
         <Route path="/my-orders/:id" element={<OrderDetails />} />
         <Route path="/Dashboard" element={
          <Protuctroute>
            <Dashboard/>
          </Protuctroute>
         }/>
         
      </Routes>
       <ToastContainer />
    </BrowserRouter>
  );
}

export default App;