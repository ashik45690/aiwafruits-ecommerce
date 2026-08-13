import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductSection from "../components/productpage/ProductSection";
import ProductSideBar from "../components/productpage/ProductSideBar";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import BackButton from "../components/common/BackButton";

function ProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState("All");

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");

    console.log("URL CATEGORY:", categoryFromUrl);

    setCategory(categoryFromUrl || "All");
  }, [searchParams]);

  const handleCategoryChange = (newCategory) => {
    console.log("SIDEBAR CATEGORY:", newCategory);

    setCategory(newCategory);

    if (!newCategory || newCategory === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: newCategory,
      });
    }
  };

  console.log("CURRENT CATEGORY:", category);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">

      <div>
        <Navbar />

        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">

          <div className="mb-6">
            <BackButton
              label="Back to Home"
              to="/"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

            <aside>
              <ProductSideBar
                category={category}
                setCategory={handleCategoryChange}
              />
            </aside>

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