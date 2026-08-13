import { useEffect, useState } from "react";
import {
  Package,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { getProductData } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import { userCart } from "../context/Cartcontext";
import { toast } from "react-toastify";

function ProductSection({ category }) {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { fetchCartData } = userCart();

  // ----------------------------------------
  // Normalize category
  // ----------------------------------------
  const normalize = (value) =>
    (value ?? "").toString().trim().toLowerCase();

  const normalizedCategory = normalize(category);

  // ----------------------------------------
  // Filter products
  // ----------------------------------------
  const FilterProducts =
    !normalizedCategory || normalizedCategory === "all"
      ? Products
      : Products.filter((item) => {
          const productCategory = normalize(item?.Category);

          return productCategory === normalizedCategory;
        });

  // ----------------------------------------
  // Fetch products
  // ----------------------------------------
useEffect(() => {
  const fetchProducts = async () => {
    const CACHE_KEY = "aiwa_fruits_products";
    const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

    // ----------------------------------------
    // 1. Check cached products
    // ----------------------------------------
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);

      if (cachedData) {
        const parsed = JSON.parse(cachedData);

        const isValid =
          Date.now() - parsed.timestamp < CACHE_TIME;

        if (isValid && Array.isArray(parsed.products)) {
          setProducts(parsed.products);

          // Important:
          // Don't show skeleton when cached data exists
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Cache read error:", error);
    }

    // ----------------------------------------
    // 2. Fetch fresh products
    // ----------------------------------------
    try {
      const response = await getProductData();

      const productList = Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

      if (productList.length > 0) {
        setProducts(productList);

        // ----------------------------------------
        // 3. Save fresh data to cache
        // ----------------------------------------
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            products: productList,
            timestamp: Date.now(),
          })
        );
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);

      // If cache exists, keep showing cached products
      setProducts((currentProducts) => currentProducts);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  // ----------------------------------------
  // Add product to cart
  // ----------------------------------------
  const CartHandle = async (ProductId) => {
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
        toast.error(response?.message || "Failed to add product.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Add to cart error:", error);

      toast.error(
        error?.response?.data?.message || "Something went wrong!",
        {
          position: "top-center",
        }
      );
    }
  };

  // ----------------------------------------
  // Page heading
  // ----------------------------------------
  const sectionTitle =
    category === "All" || !category
      ? "Organic Fresh Harvest"
      : `${category} Selection`;

  return (
    <div className="w-full">
      {/* ======================================
          HEADER
      ====================================== */}
      <div className="mb-5 sm:mb-6 flex items-center justify-between">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {sectionTitle}
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
            Showing {FilterProducts.length} fresh product
            {FilterProducts.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {/* ======================================
          LOADING
      ====================================== */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 items-stretch">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="
                bg-white
                rounded-2xl
                border border-slate-200
                overflow-hidden
                animate-pulse
                h-full
              "
            >
              {/* Image skeleton */}
              <div className="h-40 sm:h-48 bg-slate-100"></div>

              {/* Content skeleton */}
              <div className="p-3 sm:p-4">
                <div className="h-4 bg-slate-100 rounded w-3/4 mb-3"></div>

                <div className="h-3 bg-slate-100 rounded w-full mb-2"></div>

                <div className="h-3 bg-slate-100 rounded w-2/3 mb-4"></div>

                <div className="h-9 bg-slate-100 rounded-xl w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : FilterProducts.length === 0 ? (
        /* ======================================
            NO PRODUCTS
        ====================================== */
        <div
          className="
            bg-white
            border border-slate-200
            rounded-2xl
            p-8 sm:p-12
            text-center
            flex flex-col
            items-center
            justify-center
            min-h-[300px]
          "
        >
          <div
            className="
              w-16 h-16
              rounded-full
              bg-emerald-50
              border border-emerald-100
              flex items-center justify-center
              text-emerald-600
              mb-4
            "
          >
            <Package size={28} />
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-1">
            No Fruits Found
          </h3>

          <p className="text-sm text-slate-500 max-w-sm">
            We currently don't have available fruits under "{category}".
            Please check other categories!
          </p>
        </div>
      ) : (
        /* ======================================
            PRODUCT GRID
        ====================================== */
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-3
            sm:gap-5
            items-stretch
          "
        >
          {FilterProducts.map((product) => {
            const stock = Number(product?.Stockquantity || 0);
            const isInStock = stock > 0;

            return (
              <div
                key={product._id}
                className="
                  group
                  bg-white
                  border border-slate-200
                  rounded-2xl
                  overflow-hidden
                  flex flex-col
                  h-full
                  min-w-0
                  transition-all
                  duration-200
                  hover:border-emerald-200
                  hover:shadow-md
                "
              >
                {/* ======================================
                    IMAGE SECTION
                ====================================== */}
                <div
                  className="
                    relative
                    w-full
                    h-40
                    sm:h-48
                    bg-slate-50
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                    border-b border-slate-100
                    p-3
                    sm:p-4
                    shrink-0
                  "
                >
                  {/* Category Badge */}
                  <span
                    className="
                      absolute
                      top-2.5
                      left-2.5
                      sm:top-3
                      sm:left-3
                      z-10
                      bg-emerald-100
                      text-emerald-800
                      border border-emerald-200
                      text-[9px]
                      sm:text-[10px]
                      font-extrabold
                      uppercase
                      tracking-wide
                      px-2
                      sm:px-2.5
                      py-1
                      rounded-full
                      whitespace-nowrap
                    "
                  >
                    {product.Category || "Fresh"}
                  </span>

                  {/* Product Image */}
                  <img
                    src={product.Image}
                    alt={product.Productname || "Fresh fruit"}
                    loading="lazy"
                    className="
                      w-full
                      h-full
                      object-contain
                      block
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* ======================================
                    CARD DETAILS
                ====================================== */}
                <div
                  className="
                    p-3
                    sm:p-4
                    flex
                    flex-col
                    flex-1
                    min-w-0
                  "
                >
                  {/* Product name + description */}
                  <div className="min-w-0">
                    <h3
                      className="
                        text-sm
                        sm:text-base
                        font-bold
                        text-slate-900
                        truncate
                        group-hover:text-emerald-700
                        transition-colors
                      "
                    >
                      {product.Productname}
                    </h3>

                    <p
                      className="
                        text-[11px]
                        sm:text-xs
                        text-slate-500
                        line-clamp-2
                        mt-1
                        font-medium
                        leading-relaxed
                        min-h-[30px]
                        sm:min-h-[32px]
                      "
                    >
                      {product.Description ||
                        "Fresh organic fruit harvested directly from farms."}
                    </p>
                  </div>

                  {/* ======================================
                      PRICE + STOCK + BUTTON
                  ====================================== */}
                  <div
                    className="
                      mt-auto
                      pt-3
                      sm:pt-4
                      mt-3
                      border-t
                      border-slate-100
                    "
                  >
                    {/* Price and Stock */}
                    <div
                      className="
                        flex
                        items-end
                        justify-between
                        gap-2
                        mb-3
                      "
                    >
                      {/* Price */}
                      <div className="shrink-0">
                        <span
                          className="
                            text-base
                            sm:text-lg
                            font-extrabold
                            text-emerald-700
                          "
                        >
                          ₹{product.Price}
                        </span>

                        <span
                          className="
                            text-[10px]
                            sm:text-[11px]
                            text-slate-400
                            font-medium
                            ml-0.5
                          "
                        >
                          / Kg
                        </span>
                      </div>

                      {/* Stock */}
                      <div
                        className="
                          flex
                          items-center
                          justify-end
                          gap-1
                          min-w-0
                          text-[9px]
                          sm:text-[11px]
                          font-semibold
                          text-slate-500
                          text-right
                        "
                      >
                        {isInStock ? (
                          <>
                            <CheckCircle2
                              size={12}
                              className="text-emerald-600 shrink-0"
                            />

                            <span className="leading-tight">
                              {stock} Kg in stock
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertCircle
                              size={12}
                              className="text-rose-500 shrink-0"
                            />

                            <span className="text-rose-600 leading-tight">
                              Out of Stock
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart */}
                    {isInStock ? (
                      <button
                        type="button"
                        onClick={() => CartHandle(product._id)}
                        className="
                          w-full
                          min-h-[42px]
                          bg-emerald-700
                          hover:bg-emerald-800
                          active:bg-emerald-900
                          text-white
                          py-2.5
                          px-3
                          rounded-xl
                          text-xs
                          sm:text-sm
                          font-bold
                          transition-all
                          duration-200
                          flex
                          items-center
                          justify-center
                          gap-2
                          cursor-pointer
                        "
                      >
                        <ShoppingBag
                          size={15}
                          className="shrink-0"
                        />

                        <span>Add To Cart</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="
                          w-full
                          min-h-[42px]
                          bg-slate-100
                          text-slate-400
                          py-2.5
                          px-3
                          rounded-xl
                          text-xs
                          sm:text-sm
                          font-bold
                          cursor-not-allowed
                          border border-slate-200
                        "
                      >
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductSection;