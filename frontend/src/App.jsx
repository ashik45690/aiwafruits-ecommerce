import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Dashboard from "./pages/Dashboard";
import MyOrders from "./pages/Myorders";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Protuctroute } from "./components/ProtectRoute";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import OrderDetails from "./components/myOrders/OrderDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route
          path="/user-login"
          element={<LoginPage />}
        />

        <Route
          path="/user-Register"
          element={<RegisterPage />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Products */}
        <Route
          path="/product-Page"
          element={<ProductPage />}
        />

        {/* Cart */}
        <Route
          path="/Cart-items"
          element={<CartPage />}
        />

        {/* Checkout */}
        <Route
          path="/Check-out"
          element={<CheckoutPage />}
        />

        {/* Orders */}
        <Route
          path="/Myorders"
          element={<MyOrders />}
        />

        <Route
          path="/my-orders/:id"
          element={<OrderDetails />}
        />

        {/* Dashboard */}
        <Route
          path="/Dashboard"
          element={
            <Protuctroute>
              <Dashboard />
            </Protuctroute>
          }
        />

      </Routes>

      {/* Toast Notifications */}
      <ToastContainer />

    </BrowserRouter>
  );
}

export default App;