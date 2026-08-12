import { useEffect, useState } from "react";

import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

import BestsalesSection from "../components/homepage/BestalesSection";
import CategorySection from "../components/homepage/CategorySection";
import CustomerfeedbackSection from "../components/homepage/CustomerfeedbackSection";
import HeroSection from "../components/homepage/HeroSection";
import HowitsWorks from "../components/homepage/HowitsWorkSection";
import SpecialitySection from "../components/homepage/SpecialitySection";
import Whychooseus from "../components/homepage/WhychooseusSection";

import { getBestSellerProducts } from "../services/productService";

function Home() {
  const [bestSellers, setBestSellers] = useState([]);
  const [bestSellerLoading, setBestSellerLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setBestSellerLoading(true);

        const response = await getBestSellerProducts();

        console.log("Best Seller Response:", response);

        if (response?.success) {
          setBestSellers(response.data || []);
        } else {
          setBestSellers([]);
        }
      } catch (error) {
        console.log("Best Seller Fetch Error:", error);
        setBestSellers([]);
      } finally {
        setBestSellerLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">

      <Navbar />

      <HeroSection />

      <CategorySection />

      <SpecialitySection />

      {/* Real Best Seller Products */}
      <BestsalesSection
        bestSellers={bestSellers}
        loading={bestSellerLoading}
      />

      <Whychooseus />

      <HowitsWorks />

      <CustomerfeedbackSection />

      <Footer />

    </div>
  );
}

export default Home;