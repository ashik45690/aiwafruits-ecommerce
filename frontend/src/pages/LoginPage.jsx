import { ArrowLeft, Leaf, ShieldCheck, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginImg from "../assets/images/loginImage.png";
import Loginfrom from "../components/Auth/login/loginform";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-slate-50 px-4 py-6">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-6 hover:gap-3 transition-all cursor-pointer"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <section className="max-w-[1280px] mx-auto min-h-[calc(100vh-100px)] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg">

          {/* Left — Hero Image Panel */}
          <div className="relative hidden lg:flex flex-col justify-end min-h-[600px]">
            <img
              src={LoginImg}
              alt="Fresh organic fruits"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent" />

            <div className="relative z-10 p-10 pb-12">
              

              <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
                Taste the freshness<br />of nature.
              </h2>

              <p className="text-emerald-100 text-sm font-medium leading-relaxed mb-6 max-w-sm">
                Our organic fruits are harvested at the peak of ripeness and delivered directly from farm to your doorstep.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-emerald-300 shrink-0" />
                  <span className="text-white text-xs font-semibold">Quality Guaranteed</span>
                </div>
                <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2.5">
                  <Truck size={16} className="text-emerald-300 shrink-0" />
                  <span className="text-white text-xs font-semibold">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Login Form */}
          <div className="flex items-center justify-center px-8 py-12 bg-white">
            <Loginfrom />
          </div>

        </div>
      </section>
    </div>
  );
}

export default LoginPage;