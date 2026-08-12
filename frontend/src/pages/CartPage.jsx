import Cartlist from "../components/cart/Cartlist";
import { userCart } from "../components/context/Cartcontext";
import OrderSummary from "../components/cart/CartorderSummery";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import BackButton from "../components/common/BackButton";

function CartPage() {
  const { cart } = userCart();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">

          {/* Top Bar with BackButton */}
          <div className="mb-6 flex items-center justify-between">
            <BackButton label="Back to Shop" to="/product-Page" />
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shopping Cart</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Review your organic fruits before proceeding to checkout
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
            <Cartlist />
            <OrderSummary showButton={true} />
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}

export default CartPage;