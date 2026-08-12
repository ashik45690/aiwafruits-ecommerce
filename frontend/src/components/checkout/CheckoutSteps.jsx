import { MapPin, Truck, CreditCard, Check } from "lucide-react";

function CheckoutSteps({ step }) {
  const stepsList = [
    { num: 1, label: "Shipping", sub: "Address Info", icon: MapPin },
    { num: 2, label: "Delivery", sub: "Speed & Time", icon: Truck },
    { num: 3, label: "Payment", sub: "Method & Place", icon: CreditCard },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
      <div className="flex items-center justify-between gap-2 max-w-3xl mx-auto">
        {stepsList.map((item, index) => {
          const Icon = item.icon;
          const isCompleted = step > item.num;
          const isCurrent = step === item.num;

          return (
            <div key={item.num} className="flex-1 flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all shrink-0 ${
                    isCompleted
                      ? "bg-emerald-600 text-white shadow-2xs"
                      : isCurrent
                      ? "bg-emerald-700 text-white ring-4 ring-emerald-100 shadow-2xs"
                      : "bg-slate-100 text-slate-400 border border-slate-200"
                  }`}
                >
                  {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                </div>

                <div className="hidden sm:block">
                  <p className={`text-xs font-bold ${isCurrent ? "text-emerald-900" : isCompleted ? "text-slate-800" : "text-slate-400"}`}>
                    {item.label}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {item.sub}
                  </p>
                </div>
              </div>

              {index < stepsList.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded-full transition-colors ${step > item.num ? "bg-emerald-600" : "bg-slate-200"}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CheckoutSteps;