import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { removeCartItem, updateCartQuantity } from "../../services/cartService";
import { userCart } from "../context/Cartcontext";
import { useNavigate } from "react-router-dom";

function Cartlist() {
  const { cart, fetchCartData } = userCart();
  const navigate = useNavigate();

  const handleRemove = async (productId) => {
    try {
      const response = await removeCartItem(productId);
      if (response.success) {
        await fetchCartData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantity = async (productId, action) => {
    try {
      const response = await updateCartQuantity(productId, action);
      if (response.success) {
        await fetchCartData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-12 flex flex-col items-center justify-center text-center shadow-2xs">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-5 border border-emerald-100">
          <ShoppingCart size={36} />
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900">
          Your Cart is Empty
        </h2>

        <p className="text-slate-500 text-sm font-medium mt-2 max-w-sm">
          Looks like you haven't added any farm-fresh fruits to your cart yet.
        </p>

        <button
          onClick={() => navigate('/product-Page')}
          className="mt-6 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-7 py-3 rounded-xl text-sm transition-all shadow-xs hover:shadow-sm inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Start Shopping Now</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cart.map((item) => (
        <div
          key={item.productId._id}
          className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-2xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 hover:border-emerald-200"
        >
          {/* LEFT SECTION */}
          <div className="flex items-center gap-4 sm:gap-5">

            {/* Thumbnail */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 p-2 shrink-0 flex items-center justify-center">
              <img
                src={item.productId.Image}
                alt={item.productId.Productname}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info */}
            <div className="space-y-1.5 flex-1">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                {item.productId.Category || 'Organic'}
              </span>

              <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                {item.productId.Productname}
              </h3>

              <p className="text-xs text-slate-500 font-medium line-clamp-1">
                ₹{item.productId.Price} / Kg
              </p>

              {/* Quantity Controls & Remove (Mobile view inline) */}
              <div className="flex items-center gap-4 pt-1 sm:hidden">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <button
                    onClick={() => handleQuantity(item.productId._id, "decrement")}
                    className="px-2.5 py-0.5 text-sm font-bold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                  >
                    -
                  </button>

                  <span className="px-3 py-0.5 text-xs font-bold text-slate-900 border-x border-slate-200 bg-white">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => handleQuantity(item.productId._id, "increment")}
                    className="px-2.5 py-0.5 text-sm font-bold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item.productId._id)}
                  className="text-rose-500 hover:text-rose-600 p-1 cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT SECTION (Desktop Quantity + Total Price) */}
          <div className="hidden sm:flex items-center gap-8">
            {/* Quantity */}
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
              <button
                onClick={() => handleQuantity(item.productId._id, "decrement")}
                className="w-8 h-8 flex items-center justify-center text-sm font-bold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                -
              </button>

              <span className="w-10 h-8 flex items-center justify-center text-xs font-extrabold text-slate-900 border-x border-slate-200 bg-white">
                {item.quantity}
              </span>

              <button
                onClick={() => handleQuantity(item.productId._id, "increment")}
                className="w-8 h-8 flex items-center justify-center text-sm font-bold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Subtotal */}
            <div className="text-right min-w-[80px]">
              <span className="text-xs text-slate-400 block font-medium">Subtotal</span>
              <span className="text-base font-extrabold text-slate-900">
                ₹{item.productId.Price * item.quantity}
              </span>
            </div>

            {/* Remove */}
            <button
              onClick={() => handleRemove(item.productId._id)}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
              title="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cartlist;