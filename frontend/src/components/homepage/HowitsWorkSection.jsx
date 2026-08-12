import { Hand, ShoppingBasket, Truck } from "lucide-react";

function HowitsWorks() {
  const steps = [
    {
      id: "01",
      icon: <Hand size={22} className="text-emerald-700" />,
      title: "Choose Fresh Produce",
      description: "Select from our wide range of seasonal and exotic certified organic fruits.",
    },
    {
      id: "02",
      icon: <ShoppingBasket size={22} className="text-emerald-700" />,
      title: "Add To Basket",
      description: "Fill your cart with farm-fresh goodness at transparent, fair prices.",
    },
    {
      id: "03",
      icon: <Truck size={22} className="text-emerald-700" />,
      title: "Fast Doorstep Delivery",
      description: "Get your order delivered fresh to your doorstep within 24 hours.",
    },
  ];

  return (
    <section className="w-full bg-slate-50/60 py-16 px-4 sm:px-6 border-y border-slate-100">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center max-w-lg mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Simple Process</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            How Aiwa Fruits Works
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            From orchard harvest to your doorstep in 3 effortless steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((part) => (
            <div 
              key={part.id} 
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-emerald-200 transition-all duration-200 text-center relative group"
            >
              <span className="absolute top-4 right-5 text-2xl font-black text-slate-100 group-hover:text-emerald-100 transition-colors">
                {part.id}
              </span>

              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-100 transition-colors">
                {part.icon}
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">
                {part.title}
              </h3>

              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
                {part.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowitsWorks;

