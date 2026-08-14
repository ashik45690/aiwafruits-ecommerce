import { VerifiedIcon, Leaf, ShieldCheck, Star } from "lucide-react";
import RegisterImg from "../assets/images/RegisterImage.png";
import RegisterForm from "../components/Auth/register/RegisterForm";

function RegisterPage() {
  return (
    <div className="w-full bg-slate-50 px-4 py-6 min-h-screen">
      <div className="max-w-[1280px] mx-auto flex items-center min-h-[calc(100vh-60px)]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg">

          {/* Left — Hero Image Panel */}
          <div className="relative hidden lg:flex flex-col justify-end min-h-[650px]">
            <img
              src={RegisterImg}
              alt="Fresh organic fruits banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/50 to-transparent" />

            <div className="relative z-10 p-10 pb-12">
              <div className="flex items-center gap-2 bg-white/15 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full w-fit mb-6">
               
                <span className="text-white text-xs font-bold">Join 10,000+ Happy Customers</span>
              </div>

              <h1 className="font-extrabold text-4xl text-white leading-tight mb-4">
                Join The<br />Freshness Revolution
              </h1>

              <p className="text-emerald-100 text-sm font-medium leading-relaxed mb-6 max-w-sm">
                Get access to premium organic fruits, exclusive member discounts, and priority delivery — straight from our certified organic farms.
              </p>

              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
                  <VerifiedIcon size={18} className="text-emerald-300 fill-emerald-500/30 shrink-0" />
                  <span className="text-white text-xs font-semibold">Certified Organic Quality</span>
                </div>
                <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
                  <ShieldCheck size={18} className="text-emerald-300 shrink-0" />
                  <span className="text-white text-xs font-semibold">Freshness Guaranteed on Every Order</span>
                </div>
                <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
                  <Star size={18} className="text-amber-300 shrink-0" />
                  <span className="text-white text-xs font-semibold">Earn Harvest Points on Every Purchase</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Register Form */}
          <div className="flex items-center justify-center px-8 py-12 bg-white">
            <RegisterForm />
          </div>

        </div>
      </div>
    </div>
  );
}

export default RegisterPage;