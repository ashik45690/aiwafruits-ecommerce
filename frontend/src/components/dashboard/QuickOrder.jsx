import appleImg from "../../assets/images/stone.png";
import avacado from "../../assets/images/citrus.png";
import banana from "../../assets/images/exotic.png";
import { ShoppingCart, RefreshCw } from "lucide-react";

const quickItems = [
  { image: avacado, title: "Hass Avocados", price: "₹120/kg" },
  { image: banana, title: "Sweet Bananas", price: "₹80/kg" },
  { image: appleImg, title: "Organic Apples", price: "₹95/kg" },
];

function QuickReorder() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Quick Reorder</h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">Your favourite farm picks</p>
        </div>
        <button className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer">
          <RefreshCw size={13} />
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickItems.map((item) => (
          <div
            key={item.title}
            className="border border-slate-100 rounded-xl p-4 flex flex-col items-center gap-3 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 object-contain"
              />
            </div>

            <div className="text-center">
              <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs font-semibold text-emerald-700 mt-0.5">{item.price}</p>
            </div>

            <button className="w-full bg-emerald-700 group-hover:bg-emerald-800 text-white text-[11px] font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              <ShoppingCart size={13} />
              <span>Add to Cart</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickReorder;