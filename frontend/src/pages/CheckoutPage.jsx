import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "../components/checkout/CheckoutSteps";
import ShippingForm from "../components/checkout/ShippingForm";
import DeliveryMethod from "../components/checkout/DeliveryMethod";
import PaymentForm from "../components/checkout/PaymentForm";
import OrderSummary from "../components/cart/CartorderSummery";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import BackButton from "../components/common/BackButton";

function CheckoutPage() {
  const [step, setStep] = useState(1);

  const [CheckoutData, setCheckoutData] = useState({
    shipping: {
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      postalCode: "",
    },
    delivery: null,
    payment: null,
  });

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">

          {/* Top Bar with BackButton */}
          <div className="mb-6 flex items-center justify-between">
            <BackButton label="Back to Cart" to="/Cart-items" />
            
            {step > 1 && (
              <button
                onClick={() => setStep((prev) => prev - 1)}
                className="text-xs font-bold text-slate-500 hover:text-emerald-700 underline cursor-pointer"
              >
                Previous Step ({step === 2 ? "Shipping" : "Delivery"})
              </button>
            )}
          </div>

          {/* Checkout Steps Progress Bar */}
          <CheckoutSteps step={step} />

          {/* Checkout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 mt-8">

            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs">

              {step === 1 && (
                <ShippingForm
                  setStep={setStep}
                  CheckoutData={CheckoutData}
                  setCheckoutData={setCheckoutData}
                />
              )}

              {step === 2 && (
                <DeliveryMethod
                  setStep={setStep}
                  CheckoutData={CheckoutData}
                  setCheckoutData={setCheckoutData}
                />
              )}

              {step === 3 && (
                <PaymentForm
                  CheckoutData={CheckoutData}
                  setCheckoutData={setCheckoutData}
                />
              )}

            </div>

            <OrderSummary showButton={false} />

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default CheckoutPage;