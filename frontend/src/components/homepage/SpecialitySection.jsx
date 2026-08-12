import { Leaf, Truck, BadgeCheck, CreditCard } from "lucide-react";

function SpecialitySection() {
  const specialityCardData = [
    {
      icon: <Leaf size={22} className="text-emerald-700" />,
      title: "Farm Fresh Organic",
      subtitle: "Harvested & delivered directly from certified local orchards daily",
    },
    {
      icon: <Truck size={22} className="text-emerald-700" />,
      title: "Fast Local Delivery",
      subtitle: "Guaranteed same-day delivery for all morning orders",
    },
    {
      icon: <BadgeCheck size={22} className="text-emerald-700" />,
      title: "100% Quality Checked",
      subtitle: "Multi-stage inspection ensures only prime produce reaches you",
    },
    {
      icon: <CreditCard size={22} className="text-emerald-700" />,
      title: "Safe & Easy Payment",
      subtitle: "Seamless Cash on Delivery & protected checkout process",
    },
  ];

  return (
    <div className="w-full bg-white py-14 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialityCardData.map((item, index) => (
            <div key={index} className="bg-emerald-50/50 border border-emerald-100/80 p-6 rounded-2xl transition-all duration-200 hover:shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-emerald-100 shadow-2xs flex items-center justify-center shrink-0">
                {item.icon}
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpecialitySection;