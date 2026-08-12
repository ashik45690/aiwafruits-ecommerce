import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import MyOrderList from "../components/myOrders/OrderList";
import { CancelOrderService, GetMyorders } from "../services/orederService";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import BackButton from "../components/common/BackButton";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    try {
      setLoading(true);
      const response = await GetMyorders();

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }


  async function handleCancelOrder(orderId) {
  try {
    const response = await CancelOrderService(orderId);

    if (response?.success) {
      // Remove cancelled order from UI
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );

      toast.success(
        response.message || "Order cancelled successfully"
      );
    } else {
      toast.error(
        response?.message || "Failed to cancel order"
      );
    }
  } catch (error) {
    console.log(error);

    toast.error(
      error?.response?.data?.message ||
        "Something went wrong while cancelling the order"
    );
  }
}

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">

          {/* Top Bar with BackButton */}
          <div className="mb-6 flex items-center justify-between">
            <BackButton label="Back to Home" to="/" />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Fruit Orders</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Track delivery progress and view purchase details
            </p>
          </div>

          {loading ? (
            <div className="space-y-4 py-8">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse h-40"></div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white border border-slate-200/90 rounded-2xl py-16 px-6 text-center flex flex-col items-center justify-center shadow-2xs">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-4">
                <Package size={32} />
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                No Orders Placed Yet
              </h2>

              <p className="text-slate-500 text-sm font-medium mt-1 max-w-sm">
                You haven't placed any fruit orders yet. Start exploring our organic farm selection!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <MyOrderList
  key={order._id}
  order={order}
  onCancelOrder={handleCancelOrder}
/>
              ))}
            </div>
          )}

        </main>
      </div>

      <Footer />
    </div>
  );
}

export default MyOrders;
