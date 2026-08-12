import { useEffect, useState } from "react";
import {
  CalendarDays,
  CreditCard,
  MapPin,
  Package,
  Truck,
  Download,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { GetSingleOrder } from "../../services/orederService";
import { downloadInvoice } from '../../invoice/invoice';
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import BackButton from "../common/BackButton";
import CancelButton from "../common/CancelButton";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await GetSingleOrder(id);
        if (response.data.success) {
          setOrder(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-slate-500 font-semibold text-base animate-pulse">Loading order details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = order.items.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  const shipping = order.totalAmount - subtotal;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">

          {/* Back Button */}
          <div className="mb-6">
            <BackButton label="Back to My Orders" to="/Myorders" />
          </div>

          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Order Details
                </h1>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  #{order._id.slice(-6).toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Placed on {new Date(order.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-4 py-1.5 rounded-full text-xs font-extrabold">
                {order?.orderStatus}
              </span>

              <button
                onClick={() => downloadInvoice(order)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Download size={14} />
                <span>Invoice PDF</span>
              </button>
            </div>
          </div>

          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 shrink-0">
                <CalendarDays size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Order Date</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 shrink-0">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Delivery Speed</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {order.deliveryMethod}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 shrink-0">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Payment Option</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {order.paymentMethod}
                </p>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            
            {/* Products List & Shipping Address */}
            <div className="space-y-6">

              {/* Products Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
                  <Package size={20} className="text-emerald-700" />
                  <h2 className="text-base font-bold text-slate-900">
                    Ordered Products ({order.items.length})
                  </h2>
                </div>

                <div className="divide-y divide-slate-100">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center shrink-0">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div>
                          <h3 className="font-bold text-sm text-slate-900">
                            {item.productName}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            Quantity: {item.quantity} Kg × ₹{item.price}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <h4 className="font-extrabold text-emerald-700 text-sm">
                          ₹{item.subtotal}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
                  <MapPin size={20} className="text-emerald-700" />
                  <h2 className="text-base font-bold text-slate-900">
                    Shipping Address
                  </h2>
                </div>

                <div className="text-sm font-medium text-slate-700 space-y-1">
                  <p className="font-bold text-slate-900">
                    {order.shippingAddress?.firstName} {order?.shippingAddress?.lastName}
                  </p>
                  <p>{order.shippingAddress?.street}</p>
                  <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                </div>
              </div>

            </div>

            {/* Bill Summary Sidebar */}
            <div>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
                <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                  Bill Breakdown
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-slate-900">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Shipping Fee</span>
                    <span className="font-bold text-slate-900">
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-extrabold text-slate-900">
                    <span>Total Paid</span>
                    <span className="text-emerald-700">₹{order.totalAmount}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <button 
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-2 cursor-pointer" 
                    onClick={() => downloadInvoice(order)}
                  >
                    <Download size={15} />
                    <span>Download Official Invoice</span>
                  </button>

                  {(order.orderStatus === "Pending" || order.orderStatus === "Confirmed") && (
                    <CancelButton onCancel={()=>navigate('/Myorders')}/>
                  )}
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}

export default OrderDetails;
