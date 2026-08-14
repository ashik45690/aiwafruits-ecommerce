import { VerifiedIcon, Leaf, ShieldCheck, Star, ArrowLeft } from "lucide-react";
import RegisterImg from "../assets/images/RegisterImage.png";
import RegisterForm from "../components/Auth/register/RegisterForm";
import { useNavigate } from "react-router-dom";

function RegisterPage() {


  const navigate = useNavigate()
  return (
    <div className="w-full bg-slate-50 px-4 py-6 min-h-screen">

        <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-6 hover:gap-3 transition-all cursor-pointer"
      >
        <ArrowLeft size={18} />
        Back
      </button>

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