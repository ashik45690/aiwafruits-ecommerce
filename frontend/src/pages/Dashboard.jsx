import { useState } from "react";
import ProfileCard from "../components/dashboard/ProfileCard";
import QuickReorder from "../components/dashboard/QuickOrder";
import RecentOrders from "../components/dashboard/RecentOredrs";
import Sidebar from "../components/dashboard/Sidebar";
import AddProduct from "../components/dashboard/Addproduct";
import Orders from "../components/dashboard/Orders";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import BackButton from "../components/common/BackButton";

function Dashboard() {
  const [Activepage, setActivePage] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">

          {/* Top Bar with BackButton */}
          <div className="mb-6 flex items-center justify-between">
            <BackButton label="Back to Home" to="/" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Navigation */}
            <aside className="lg:w-64 shrink-0">
              <Sidebar activepage={setActivePage} />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">

              {Activepage === "Dashboard" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      My Harvest Dashboard
                    </h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">
                      Manage your organic orders, profile, and subscriptions
                    </p>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    <div className="xl:col-span-4">
                      <ProfileCard />
                    </div>

                    <div className="xl:col-span-8">
                      <QuickReorder />
                    </div>
                  </div>

                  <RecentOrders />
                </div>
              )}

              {Activepage === "add-product-route" && (
                <AddProduct />
              )}

              {Activepage === "orders" && (
                <Orders />
              )}

            </div>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;