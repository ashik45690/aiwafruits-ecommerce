import { CalendarDays, CreditCard, Truck, Package, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CancelButton from "../common/CancelButton";

function MyOrderList({ order, onCancelOrder })  {
  const navigate = useNavigate();

  const totalItems = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200";

      case "Confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";

      case "Preparing":
        return "bg-purple-100 text-purple-800 border-purple-200";

      case "Out for Delivery":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";

      case "Delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";

      case "Cancelled":
        return "bg-rose-100 text-rose-800 border-rose-200";

      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all duration-200 hover:border-emerald-200">

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-base text-slate-900">
              Order #{order._id.slice(-6).toUpperCase()}
            </h2>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md">
              Aiwa Direct
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-1">
            <CalendarDays size={14} className="text-slate-400" />
            <span>Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getStatusBadge(
            order.orderStatus
          )}`}
        >
          {order.orderStatus}
        </span>
      </div>

      {/* Body Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 my-1">
        <div>
          <p className="text-slate-400 text-xs font-medium">Quantity</p>
          <div className="flex items-center gap-1.5 mt-1 text-slate-800 font-bold text-sm">
            <Package size={16} className="text-emerald-700" />
            <span>{totalItems} Item{totalItems === 1 ? '' : 's'}</span>
          </div>
        </div>

        <div>
          <p className="text-slate-400 text-xs font-medium">Total Amount</p>
          <h3 className="text-base font-extrabold text-emerald-700 mt-1">
            ₹{order.totalAmount}
          </h3>
        </div>

        <div>
          <p className="text-slate-400 text-xs font-medium">Delivery Method</p>
          <div className="flex items-center gap-1.5 mt-1 text-slate-700 font-semibold text-xs">
            <Truck size={16} className="text-emerald-700" />
            <span className="truncate">{order.deliveryMethod}</span>
          </div>
        </div>

        <div>
          <p className="text-slate-400 text-xs font-medium">Payment</p>
          <div className="flex items-center gap-1.5 mt-1 text-slate-700 font-semibold text-xs">
            <CreditCard size={16} className="text-emerald-700" />
            <span>{order.paymentMethod}</span>
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          onClick={() => navigate(`/my-orders/${order._id}`)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-2xs hover:shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
        >
          <span>View Order Details</span>
          <ArrowRight size={14} />
        </button>

        {(order.orderStatus === "Pending" || order.orderStatus === "Confirmed") && (
          <CancelButton onCancel={() => onCancelOrder(order._id)}/>
        )}
      </div>

    </div>
  );
}

export default MyOrderList;
