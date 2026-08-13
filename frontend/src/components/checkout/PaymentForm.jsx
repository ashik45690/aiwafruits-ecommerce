import { useContext } from "react";
import { CreditCard, Banknote, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../context/Authcontext";
import { userCart } from "../context/Cartcontext";
import { OrederServices } from "../../services/orederService";

function PaymentForm({ CheckoutData, setCheckoutData }) {
  const { user } = useContext(AuthContext);
  const { cart, fetchCartData } = userCart();

  const navigate = useNavigate();

  const subtotal = cart ? cart.reduce((total, item) => {
    return total + item.productId.Price * item.quantity;
  }, 0) : 0;

  const shipping = subtotal > 500 ? 0 : 20;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    try {
      if (!cart || cart.length === 0) {
        return toast.error("Your cart is empty");
      }

      const items = cart.map((item) => ({
        productId: item.productId._id,
        productName: item.productId.Productname,
        productImage: item.productId.Image,
        quantity: item.quantity,
        price: item.productId.Price,
        subtotal: item.productId.Price * item.quantity,
      }));

      const orderData = {
        userId: user?._id,

        shippingAddress: {
          firstName: CheckoutData.shipping.firstName,
          lastName: CheckoutData.shipping.lastName,
          street: CheckoutData.shipping.street,
          city: CheckoutData.shipping.city,
          postalCode: CheckoutData.shipping.postalCode,
        },

        items,

        deliveryMethod: CheckoutData.delivery?.method || "Standard Delivery",
        paymentMethod: "COD",
        totalAmount: total,
      };

      const response = await OrederServices(orderData);

      if (response.data.success) {
        setCheckoutData((prev) => ({
          ...prev,
          payment: {
            method: "Cash On Delivery",
          },
        }));

        toast.success(response.data.message || "🎉 Order placed successfully!", {
          position: "top-center",
          autoClose: 2500,
        });

        await fetchCartData();

        setTimeout(() => {
          navigate("/Myorders");
        }, 1200);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to place order"
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
          <CreditCard size={20} />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Payment Method</h2>
          <p className="text-xs text-slate-500 font-medium">Select how you'd like to pay for your fresh harvest</p>
        </div>
      </div>

      <div className="space-y-4">

        {/* Cash On Delivery (Active) */}
        <div className="rounded-2xl p-5 border-2 border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Banknote size={24} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">Cash On Delivery (COD)</h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Recommended
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Pay safely in cash or UPI when your fruits are delivered to your door.
              </p>
            </div>
          </div>

          <CheckCircle2 size={22} className="text-emerald-700 shrink-0" />
        </div>

        {/* Online Payment (Under maintenance) */}
        <div className="rounded-2xl p-5 border border-slate-200 bg-slate-50/60 opacity-60 flex items-center justify-between cursor-not-allowed">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-400 flex items-center justify-center shrink-0">
              <CreditCard size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-700">UPI / Credit Card / Debit Card</h3>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Under Maintenance
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Online gateway undergoing scheduled maintenance. Please use COD.
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShieldCheck size={20} />
          <span>Place Order (₹{total})</span>
        </button>
      </div>
    </div>
  );
}

export default PaymentForm;
