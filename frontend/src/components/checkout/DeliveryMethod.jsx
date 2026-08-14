import { Truck, Zap, ArrowRight, Clock } from "lucide-react";

function DeliveryMethod({ setStep, CheckoutData, setCheckoutData }) {
  const selectedMethod = CheckoutData.delivery?.method;

  const handleDelivery = (method, time, charge) => {
    setCheckoutData((prev) => ({
      ...prev,
      delivery: {
        method,
        time,
        charge,
      },
    }));
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="pb-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
          <Truck size={20} />
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Delivery Method
          </h2>

          <p className="text-xs text-slate-500 font-medium">
            Select your preferred delivery speed
          </p>
        </div>
      </div>

      <div className="space-y-4">

        {/* =========================
            STANDARD DELIVERY
        ========================== */}
        <div
          onClick={() =>
            handleDelivery(
              "Standard Delivery",
              "30-45 Minutes",
              20
            )
          }
          className={`cursor-pointer rounded-2xl p-5 flex items-center justify-between transition-all border ${
            selectedMethod === "Standard Delivery"
              ? "border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-100 shadow-xs"
              : "border-slate-200 hover:border-slate-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-4">

            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selectedMethod === "Standard Delivery"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              <Truck size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm text-slate-900">
                  Standard Fresh Delivery
                </h3>

                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  Standard
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                <Clock size={12} />

                <span>
                  Delivered fresh within 30-45 minutes
                </span>
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="font-extrabold text-sm text-emerald-700">
              ₹20
            </span>
          </div>
        </div>

        {/* =========================
            EXPRESS DELIVERY
        ========================== */}
        <div
          onClick={() =>
            handleDelivery(
              "Express Delivery",
              "10-15 Minutes",
              70
            )
          }
          className={`cursor-pointer rounded-2xl p-5 flex items-center justify-between transition-all border ${
            selectedMethod === "Express Delivery"
              ? "border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-100 shadow-xs"
              : "border-slate-200 hover:border-slate-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-4">

            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selectedMethod === "Express Delivery"
                  ? "bg-amber-500 text-white"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              <Zap size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm text-slate-900">
                  Priority Express
                </h3>

                <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  Fastest
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                <Clock size={12} />

                <span>
                  Delivered priority within 10-15 minutes
                </span>
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="font-extrabold text-sm text-slate-900">
              ₹70
            </span>

            <span className="block text-[10px] text-slate-400 font-medium">
              ₹20 + ₹50
            </span>
          </div>
        </div>

      </div>

      {/* Continue */}
      <div className="pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => {
            if (!CheckoutData.delivery?.method) {
              alert("Please select a delivery method");
              return;
            }

            setStep(3);
          }}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue To Payment</span>
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}

export default DeliveryMethod;