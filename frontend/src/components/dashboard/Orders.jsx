import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../services/orederService";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  Search,
  Eye,
  Package,
} from "lucide-react";

const STATUS_BADGE = {
  Pending: "bg-amber-100 text-amber-800 border-amber-200",
  Confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  Preparing: "bg-purple-100 text-purple-800 border-purple-200",
  "Out for Delivery": "bg-indigo-100 text-indigo-800 border-indigo-200",
  Delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Cancelled: "bg-rose-100 text-rose-800 border-rose-200",
};

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      const response = await getAllOrders();
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredOrders = useMemo(() => {
    let data = [...orders];
    data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (search) {
      data = data.filter((item) =>
        item.userId?.fullname?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "All") {
      data = data.filter((item) => item.orderStatus === status);
    }

    return data;
  }, [orders, search, status]);

  const totalOrders = orders.length;
  const pending = orders.filter((o) => o.orderStatus === "Pending").length;
  const delivered = orders.filter((o) => o.orderStatus === "Delivered").length;
  const ongoing = orders.filter((o) =>
    ["Confirmed", "Preparing", "Out for Delivery"].includes(o.orderStatus)
  ).length;

  const statCards = [
    { label: "Total Orders", value: totalOrders, icon: ShoppingBag, color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
    { label: "Pending", value: pending, icon: Clock, color: "bg-amber-50 text-amber-700 border-amber-100" },
    { label: "Ongoing", value: ongoing, icon: Truck, color: "bg-blue-50 text-blue-700 border-blue-100" },
    { label: "Delivered", value: delivered, icon: CheckCircle, color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  ];

  return (
    <div className="space-y-6">

      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
          <Package size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Orders Management
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Track and manage all customer orders
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${color}`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-400">{label}</p>
              <h2 className="text-2xl font-extrabold text-slate-900">{value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition cursor-pointer"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Preparing</option>
          <option>Out for Delivery</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center">
            <p className="text-slate-400 font-semibold text-sm animate-pulse">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center gap-3">
            <Package size={36} className="text-slate-300" />
            <p className="text-slate-400 font-semibold text-sm">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-emerald-700 text-white">
                  <th className="p-4 text-left text-xs font-extrabold">#</th>
                  <th className="p-4 text-left text-xs font-extrabold">Customer</th>
                  <th className="p-4 text-left text-xs font-extrabold">Email</th>
                  <th className="p-4 text-left text-xs font-extrabold">Total</th>
                  <th className="p-4 text-left text-xs font-extrabold">Payment</th>
                  <th className="p-4 text-left text-xs font-extrabold">Status</th>
                  <th className="p-4 text-left text-xs font-extrabold">Date</th>
                  <th className="p-4 text-left text-xs font-extrabold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 text-xs font-bold text-slate-500">{index + 1}</td>
                    <td className="p-4 text-sm font-bold text-slate-900">{order.userId?.fullname}</td>
                    <td className="p-4 text-xs font-medium text-slate-500">{order.userId?.email}</td>
                    <td className="p-4 text-sm font-extrabold text-emerald-700">₹{order.totalAmount}</td>
                    <td className="p-4 text-xs font-semibold text-slate-600">{order.paymentMethod}</td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${STATUS_BADGE[order.orderStatus] || "bg-slate-100 text-slate-700 border-slate-200"}`}>
                        {order.orderStatus}
                      </span>
                    </td>

                    <td className="p-4 text-xs font-medium text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => navigate(`/admin/orders/${order._id}`)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye size={13} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;