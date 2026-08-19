import {
  Search,
  ShoppingBag,
  Menu,
  X,
  House,
  Package,
  Grid3X3,
  Info,
  Phone,
  LogIn,
  LogOut as LogOutIcon,
  User,
} from "lucide-react";

import logo from "../../assets/images/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import { LogOut } from "../../services/authService";
import { userCart } from "../context/Cartcontext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user, setUser, loading } = useContext(AuthContext);
  const { cart } = userCart();

  function HandleNavigate(path) {
    navigate(path);
    setMenuOpen(false);
  }

  async function LogoutUser() {
    const response = await LogOut();

    if (response.success) {
      setUser(null);
      navigate("/user-login");
      setMenuOpen(false);
    }
  }

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-100/80 shadow-xs">
      <nav className="max-w-[1280px] mx-auto h-20 px-4 sm:px-6 flex items-center justify-between">


        <div 
          onClick={() => HandleNavigate("/")} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl   flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-105">
            <img
              src={logo}
              alt="Aiwa Fruits Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <span className="text-xl font-extrabold text-emerald-950 tracking-tight">Aiwa</span>
              <span className="text-xl font-extrabold text-emerald-600 tracking-tight">Fruits</span>
            </div>
            <p className="text-[10px] font-medium text-emerald-700 uppercase tracking-widest">Fresh & Organic</p>
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <li
            onClick={() => HandleNavigate("/")}
            className={`cursor-pointer transition-colors duration-200 py-1 border-b-2 ${
              isActive("/") 
                ? "text-emerald-700 border-emerald-600 font-bold" 
                : "border-transparent hover:text-emerald-600 hover:border-emerald-200"
            }`}
          >
            Home
          </li>

          <li
            onClick={() => HandleNavigate("/product-Page")}
            className={`cursor-pointer transition-colors duration-200 py-1 border-b-2 ${
              isActive("/product-Page") 
                ? "text-emerald-700 border-emerald-600 font-bold" 
                : "border-transparent hover:text-emerald-600 hover:border-emerald-200"
            }`}
          >
            Products
          </li>

          <li 
            onClick={() => HandleNavigate("/Myorders")}
            className={`cursor-pointer transition-colors duration-200 py-1 border-b-2 ${
              isActive("/Myorders") 
                ? "text-emerald-700 border-emerald-600 font-bold" 
                : "border-transparent hover:text-emerald-600 hover:border-emerald-200"
            }`}
          >
            My Orders
          </li>

          <li 
            onClick={() => HandleNavigate("/Dashboard")}
            className={`cursor-pointer transition-colors duration-200 py-1 border-b-2 ${
              isActive("/Dashboard") 
                ? "text-emerald-700 border-emerald-600 font-bold" 
                : "border-transparent hover:text-emerald-600 hover:border-emerald-200"
            }`}
          >
            Dashboard
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-4">

          <div className="w-56 h-10 bg-slate-50 border border-slate-200 focus-within:border-emerald-500 focus-within:bg-white rounded-full px-3.5 flex items-center gap-2 transition-all duration-200">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  navigate("/product-Page");
                }
              }}
              placeholder="Search fresh fruits..."
              className="w-full bg-transparent outline-none text-xs text-slate-800 placeholder:text-slate-400 font-medium"
            />
          </div>

          <button 
            onClick={() => navigate('/Cart-items')}
            className="relative w-10 h-10 rounded-full bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-100 flex items-center justify-center transition-all duration-200 cursor-pointer"
            title="View Cart"
          >
            <ShoppingBag size={18} className="text-emerald-800" />
            {cart && cart.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-emerald-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-in zoom-in-50">
                {cart.length}
              </span>
            )}
          </button>

          {loading ? (
            <div className="w-24 h-9 bg-slate-100 animate-pulse rounded-full"></div>
          ) : user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={LogoutUser}
                className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2 rounded-full text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => HandleNavigate("/user-login")}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              Login / Register
            </button>
          )}

        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={() => navigate('/Cart-items')}
            className="relative w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800"
          >
            <ShoppingBag size={19} />
            {cart && cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-900 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white border-b border-emerald-100 px-5 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col gap-1 text-slate-700 font-semibold text-sm">
            <li
              onClick={() => HandleNavigate("/")}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${
                isActive("/") ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-50"
              }`}
            >
              <House size={18} className="text-emerald-700" />
              <span>Home</span>
            </li>

            <li
              onClick={() => HandleNavigate("/product-Page")}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${
                isActive("/product-Page") ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-50"
              }`}
            >
              <Package size={18} className="text-emerald-700" />
              <span>Products</span>
            </li>

            <li
              onClick={() => HandleNavigate("/Myorders")}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${
                isActive("/Myorders") ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-50"
              }`}
            >
              <Grid3X3 size={18} className="text-emerald-700" />
              <span>My Orders</span>
            </li>

            <li
              onClick={() => HandleNavigate("/Cart-items")}
              className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-emerald-700" />
                <span>Cart</span>
              </div>
              <span className="bg-emerald-700 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {cart ? cart.length : 0}
              </span>
            </li>
          </ul>

          <div className="mt-6 border-t border-slate-100 pt-5">
            {loading ? (
              <div className="h-10 bg-slate-100 rounded-xl"></div>
            ) : user ? (
              <button
                onClick={LogoutUser}
                className="w-full flex items-center justify-center gap-2 bg-emerald-800 text-white py-3 rounded-xl font-semibold shadow-xs"
              >
                <LogOutIcon size={18} />
                Logout
              </button>
            ) : (
              <button
                onClick={() => HandleNavigate("/user-login")}
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow-xs"
              >
                <LogIn size={18} />
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
