import { useNavigate } from "react-router-dom";
import { userCart } from "../context/Cartcontext";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";

function OrderSummary({ showButton }) {
  const { cart } = userCart();
  const navigate = useNavigate();

  const subtotal = cart ? cart.reduce((total, item) => {
    return total + (item.productId?.Price || 0) * item.quantity;
  }, 0) : 0;

  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 20;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const freeShippingThreshold = 500;
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <aside className="lg:sticky lg:top-24 h-fit">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-5">
        
        {/* Title */}
        <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">
            Order Summary
          </h2>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            {cart ? cart.length : 0} Item{cart && cart.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Free Shipping Progress */}
        {subtotal > 0 && (
          <div className="bg-emerald-50/70 border border-emerald-100 p-3.5 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
              <div className="flex items-center gap-1.5">
                <Truck size={15} className="text-emerald-600" />
                <span>{amountNeeded === 0 ? "You unlocked Free Shipping!" : `Add ₹${amountNeeded} for Free Shipping`}</span>
              </div>
            </div>

            <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Breakdown */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between text-slate-600 font-medium">
            <span>Subtotal</span>
            <span className="font-bold text-slate-900">₹{subtotal}</span>
          </div>

          <div className="flex items-center justify-between text-slate-600 font-medium">
            <span>Estimated Shipping</span>
            <span className={shipping === 0 ? "font-bold text-emerald-700" : "font-bold text-slate-900"}>
              {shipping === 0 ? "FREE" : `₹${shipping}`}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-600 font-medium">
            <span>Estimated Tax</span>
            <span className="font-bold text-slate-900">₹{tax}</span>
          </div>
        </div>

        {/* Total Divider */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-base font-extrabold text-slate-900 block">Total Amount</span>
              <span className="text-[11px] text-slate-400 font-medium">Includes taxes & shipping</span>
            </div>

            <span className="text-2xl font-extrabold text-emerald-700">
              ₹{total}
            </span>
          </div>

          {showButton && (
            <button
              disabled={!cart || cart.length === 0}
              className={`w-full font-bold py-3.5 px-6 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 ${
                !cart || cart.length === 0 
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" 
                  : "bg-emerald-700 hover:bg-emerald-800 text-white shadow-md hover:shadow-lg cursor-pointer"
              }`}
              onClick={() => navigate("/Check-out")}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 pt-2 text-xs font-semibold text-slate-400 border-t border-slate-100">
          <ShieldCheck size={16} className="text-emerald-600" />
          <span>100% Encrypted & Safe Checkout</span>
        </div>

      </div>
    </aside>
  );
}

export default OrderSummary;