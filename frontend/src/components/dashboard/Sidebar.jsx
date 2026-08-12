import { LayoutDashboard, PlusCircle, ShoppingBag, Users } from "lucide-react";
import { useState } from "react";

function Sidebar({ activepage }) {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleSelect = (page) => {
    setActiveTab(page);
    activepage(page);
  };

  return (
    <aside className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
      <div className="pb-4 border-b border-slate-100 mb-4">
        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider text-emerald-800">
          Navigation
        </h2>
      </div>

      <nav className="space-y-2">
        <button
          onClick={() => handleSelect("Dashboard")}
          className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-3 ${
            activeTab === "Dashboard"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-slate-50 hover:bg-emerald-50/70 text-slate-700"
          }`}
        >
          <LayoutDashboard size={17} />
          <span>Dashboard Overview</span>
        </button>

        <button
          onClick={() => handleSelect("add-product-route")}
          className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-3 ${
            activeTab === "add-product-route"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-slate-50 hover:bg-emerald-50/70 text-slate-700"
          }`}
        >
          <PlusCircle size={17} />
          <span>Add Product</span>
        </button>

        <button
          onClick={() => handleSelect("orders")}
          className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-3 ${
            activeTab === "orders"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-slate-50 hover:bg-emerald-50/70 text-slate-700"
          }`}
        >
          <ShoppingBag size={17} />
          <span>All Orders</span>
        </button>

        <button
          onClick={() => handleSelect("customers")}
          className="w-full text-left px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-400 bg-slate-50 opacity-60 cursor-not-allowed flex items-center gap-3"
          title="Customer management coming soon"
        >
          <Users size={17} />
          <span>Customers</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;

