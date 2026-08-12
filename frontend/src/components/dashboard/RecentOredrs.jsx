import { Eye, ClipboardList } from "lucide-react";

const recentOrders = [
  { id: "AF-90210", date: "Aug 5, 2026", items: "Citrus Bundle", total: "₹1,240", status: "Delivered" },
  { id: "AF-88123", date: "Jul 28, 2026", items: "Mango Box", total: "₹620", status: "Pending" },
];

const statusStyle = {
  Delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Pending: "bg-amber-100 text-amber-800 border-amber-200",
  Cancelled: "bg-rose-100 text-rose-800 border-rose-200",
};

function RecentOrders() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-4">
        <ClipboardList size={20} className="text-emerald-700" />
        <h2 className="text-base font-extrabold text-slate-900">Recent Orders</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="text-left">
              <th className="pb-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Order ID</th>
              <th className="pb-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Date</th>
              <th className="pb-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Items</th>
              <th className="pb-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Total</th>
              <th className="pb-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="pb-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 text-sm font-extrabold text-slate-900">#{order.id}</td>
                <td className="py-3.5 text-xs font-medium text-slate-500">{order.date}</td>
                <td className="py-3.5 text-xs font-semibold text-slate-700">{order.items}</td>
                <td className="py-3.5 text-sm font-extrabold text-emerald-700">{order.total}</td>
                <td className="py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${statusStyle[order.status] || "bg-slate-100 text-slate-700 border-slate-200"}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3.5">
                  <button className="text-emerald-700 hover:text-emerald-900 transition cursor-pointer">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;