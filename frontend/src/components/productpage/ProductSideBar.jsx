import { Filter, Layers } from "lucide-react";

function ProductSideBar({ category, setCategory }) {
  const categoriesList = [
    { name: "All", label: "All Fresh Fruits" },
    { name: "Tropical", label: "Tropical Fruits" },
    { name: "Citrus", label: "Citrus Fruits" },
    { name: "Berries", label: "Berries & Small Fruits" },
    { name: "Melons", label: "Melons & Watermelons" },
  ];

  return (
    <aside className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 lg:p-6 lg:sticky lg:top-24">

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-emerald-700" />
          <h2 className="text-base font-bold text-slate-900">Categories</h2>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          Aiwa Fresh
        </span>
      </div>

      {/* Categories Buttons (Stacked desktop, horizontal scroll mobile) */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
        {categoriesList.map((item) => {
          const isSelected = category === item.name || (item.name === "Berries" && category === "Berry");

          return (
            <button
              key={item.name}
              onClick={() => setCategory(item.name)}
              className={`whitespace-nowrap lg:whitespace-normal text-left px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-slate-50 hover:bg-emerald-50/70 text-slate-700 hover:text-emerald-800 border border-slate-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers size={15} className={isSelected ? "text-emerald-200" : "text-slate-400"} />
                <span>{item.label}</span>
              </div>

              {isSelected && (
                <span className="w-2 h-2 rounded-full bg-emerald-300 hidden lg:inline-block"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Guarantee Notice */}
      <div className="mt-6 pt-5 border-t border-slate-100 hidden lg:block">
        <p className="text-xs font-medium text-slate-500 leading-relaxed">
          🌿 All items harvested within 24 hours of delivery. 100% satisfaction guarantee.
        </p>
      </div>

    </aside>
  );
}

export default ProductSideBar;