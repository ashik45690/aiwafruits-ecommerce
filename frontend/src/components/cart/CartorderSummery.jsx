import { useNavigate } from "react-router-dom";
import { userCart } from "../context/Cartcontext";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";

function OrderSummary({ showButton, CheckoutData }) {
  const { cart } = userCart();
  const navigate = useNavigate();

  const subtotal = cart
    ? cart.reduce((total, item) => {
        return total + (item.productId?.Price || 0) * item.quantity;
      }, 0)
    : 0;

  // Delivery method select ചെയ്താൽ അതിന്റെ charge ഉടനെ എടുക്കും
  const shipping = CheckoutData?.delivery?.charge || 0;

  const tax = 0;

  // Delivery charge ഉൾപ്പെടെ total
  const total = subtotal + shipping + tax;

  const deliverySelected = !!CheckoutData?.delivery?.method;

  return (
    <aside className="lg:sticky lg:top-24 h-fit">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-5">

        {/* Title */}
        <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">
            Order Summary
          </h2>

          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            {cart ? cart.length : 0} Item
            {cart && cart.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Delivery Status */}
        {subtotal > 0 && (
          <div className="bg-emerald-50/70 border border-emerald-100 p-3.5 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
              <Truck size={15} className="text-emerald-600" />

              <span>
                {deliverySelected
                  ? `${CheckoutData.delivery.method} selected`
                  : "Select a delivery method"}
              </span>
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-3 text-sm">

          {/* Subtotal */}
          <div className="flex items-center justify-between text-slate-600 font-medium">
            <span>Subtotal</span>

            <span className="font-bold text-slate-900">
              ₹{subtotal}
            </span>
          </div>

          {/* Shipping */}
          {deliverySelected && (
            <div className="flex items-center justify-between text-slate-600 font-medium">
              <span>Shipping</span>

              <span className="font-bold text-slate-900">
                ₹{shipping}
              </span>
            </div>
          )}

          {/* Tax */}
          <div className="flex items-center justify-between text-slate-600 font-medium">
            <span>Tax</span>

            <span className="font-bold text-slate-900">
              ₹{tax}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-slate-100 pt-4">

          <div className="flex items-center justify-between mb-5">

            <div>
              <span className="text-base font-extrabold text-slate-900 block">
                Total Amount
              </span>

              <span className="text-[11px] text-slate-400 font-medium">
                Includes shipping & taxes
              </span>
            </div>

            <span className="text-2xl font-extrabold text-emerald-700">
              ₹{total}
            </span>

          </div>

          {/* Checkout Button */}
          {showButton && (
            <button
              disabled={!cart || cart.length === 0}
              onClick={() => navigate("/Check-out")}
              className={`w-full font-bold py-3.5 px-6 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 ${
                !cart || cart.length === 0
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                  : "bg-emerald-700 hover:bg-emerald-800 text-white shadow-md hover:shadow-lg cursor-pointer"
              }`}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>

        {/* Security */}
        <div className="flex items-center justify-center gap-2 pt-2 text-xs font-semibold text-slate-400 border-t border-slate-100">
          <ShieldCheck size={16} className="text-emerald-600" />

          <span>
            100% Encrypted & Safe Checkout
          </span>
        </div>

      </div>
    </aside>
  );
}

export default OrderSummary;