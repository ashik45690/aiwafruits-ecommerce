import { useEffect, useState } from 'react';
import { Package, ShoppingBag, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProductData } from '../../services/productService';
import { addToCart } from '../../services/cartService';
import { userCart } from '../context/Cartcontext';
import { toast } from 'react-toastify';

function ProductSection({ category }) {
 const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { fetchCartData } = userCart();

  const normalize = (value) =>
    (value ?? "").toString().trim().toLowerCase();

  const normalizedCategory = normalize(category);

  const FilterProducts =
    !normalizedCategory || normalizedCategory === "all"
      ? Products
      : Products.filter((item) => {
          const productCategory = normalize(item?.Category);

          console.log(
            "PRODUCT:",
            item?.Productname,
            "CATEGORY:",
            productCategory,
            "SELECTED:",
            normalizedCategory
          );

          return productCategory === normalizedCategory;
        });
  async function CartHandle(ProductId) {
    try {
      if (!ProductId) return;

      const response = await addToCart({ ProductId });

      if (response?.success) {
        toast.success(response.message || "🛒 Product added to cart!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
        });

        fetchCartData();
      } else {
        toast.error(response.message || "Failed to add product.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Something went wrong!",
        {
          position: "top-center",
        }
      );
    }
  }

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const cts = await getProductData();

      console.log("API RESPONSE:", cts);

      const productList = Array.isArray(cts?.data?.data)
        ? cts.data.data
        : [];

      console.log(
        "PRODUCT CATEGORIES:",
        productList.map((product) => ({
          name: product.Productname,
          category: product.Category,
        }))
      );

      setProducts(productList);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {category === "All" || !category ? "Organic Fresh Harvest" : `${category} Selection`}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
            Showing {FilterProducts.length} fresh product{FilterProducts.length === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 py-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 animate-pulse h-72">
              <div className="w-full h-36 bg-slate-100 rounded-xl mb-4"></div>
              <div className="h-4 bg-slate-100 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-100 rounded w-1/2 mb-4"></div>
              <div className="h-9 bg-slate-100 rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      ) : FilterProducts.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
            <Package size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Fruits Found</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            We currently don't have available fruits under "{category}". Please check other categories!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {FilterProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between group"
            >
              {/* Image & Stock Badge */}
              <div className="relative aspect-4/3 bg-slate-50/80 p-4 flex items-center justify-center overflow-hidden border-b border-slate-100">
                <span className="absolute top-3 left-3 bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-0.5 rounded-full">
                  {product.Category || 'Fresh'}
                </span>

                <img
                  src={product.Image}
                  alt={product.Productname}
                  className="w-full h-full object-contain "
                />
              </div>

              {/* Card Details */}
              <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {product.Productname}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-medium leading-relaxed min-h-[32px]">
                    {product.Description || 'Fresh organic fruit harvested directly from farms.'}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-lg font-extrabold text-emerald-700">₹{product.Price}</span>
                      <span className="text-[11px] text-slate-400 font-medium"> / Kg</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                      {product.Stockquantity > 0 ? (
                        <>
                          <CheckCircle2 size={13} className="text-emerald-600" />
                          <span>{product.Stockquantity} Kg in stock</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={13} className="text-rose-500" />
                          <span className="text-rose-600">Out of Stock</span>
                        </>
                      )}
                    </div>
                  </div>

                  {product.Stockquantity > 0 ? (
                    <button
                      onClick={() => CartHandle(product._id)}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag size={15} />
                      <span>Add To Cart</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-slate-100 text-slate-400 py-2.5 px-4 rounded-xl text-xs font-bold cursor-not-allowed border border-slate-200"
                    >
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductSection;
