import { useState } from "react";
import ProductSection from "../components/productpage/ProductSection";
import ProductSideBar from "../components/productpage/ProductSideBar";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import BackButton from "../components/common/BackButton";

function ProductPage() {
  const [category, setCategory] = useState("All");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">

          {/* Top Bar with BackButton */}
          <div className="mb-6">
            <BackButton label="Back to Home" to="/" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            
            {/* Sidebar (Mobile drawer or desktop sticky) */}
            <aside>
              <ProductSideBar
                category={category}
                setCategory={setCategory}
              />
            </aside>

            {/* Main Product Grid Section */}
            <section>
              <ProductSection
                category={category}
              />
            </section>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}

export default ProductPage;