import { ShoppingBag, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BestsalesSection({ bestSellers, loading }) {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto">

        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Recommended Picks
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Fresh Picks For You
            </h2>

            <p className="text-slate-500 text-sm mt-1 font-medium">
              Hand-picked bestsellers delivered straight from organic farms
            </p>
          </div>

          <button
            onClick={() => navigate("/product-Page")}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer group"
          >
            <span>View All Products</span>

            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-4/3 bg-slate-100" />

                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />

                  <div className="pt-2 border-t border-slate-100 flex justify-between">
                    <div className="h-5 bg-slate-100 rounded w-20" />
                    <div className="h-9 w-9 bg-slate-100 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}

          </div>
        ) : bestSellers.length === 0 ? (

          /* Empty State */
          <div className="border border-slate-200 rounded-2xl py-14 text-center">
            <h3 className="text-lg font-bold text-slate-800">
              No Best Sellers Yet
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Best selling products will appear here once customers place orders.
            </p>
          </div>

        ) : (

          /* Product Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {bestSellers.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate("/product-Page")}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-lg hover:border-emerald-200 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >

                {/* Image & Badges */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-50 p-4 flex items-center justify-center">

                  {/* Best Seller Badge */}
                  <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs">
                    Best Seller
                  </span>

                  {/* Sold Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-slate-100 flex items-center gap-1 text-xs font-bold text-slate-700 shadow-2xs">
                    <Star
                      size={12}
                      className="fill-amber-400 text-amber-400"
                    />

                    <span>
                      {item.totalSold} sold
                    </span>
                  </div>

                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-full object-cover "
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">

                  <div>
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {item.productName}
                    </h3>

                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Fresh & Premium
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">

                    <div>
                      <div className="flex items-baseline gap-1.5">

                        <span className="text-base font-extrabold text-emerald-700">
                          ₹{item.price}
                        </span>

                        <span className="text-xs text-slate-400 font-medium">
                          / Kg
                        </span>

                      </div>
                    </div>

                    {/* Add To Cart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/product-Page");
                      }}
                      className="w-9 h-9 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer"
                      title="Add to Cart"
                    >
                      <ShoppingBag size={16} />
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

        {/* Explore All Button */}
        <div className="mt-12 text-center">

          <button
            onClick={() => navigate("/product-Page")}
            className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200 px-6 py-3 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-2xs hover:shadow-sm transition-all cursor-pointer"
          >
            <span>Explore All Fresh Products</span>

            <ArrowRight size={15} />
          </button>

        </div>

      </div>
    </section>
  );
}

export default BestsalesSection;