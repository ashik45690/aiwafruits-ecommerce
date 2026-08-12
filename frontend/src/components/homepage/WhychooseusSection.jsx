import whychooseus from "../../assets/videos/whychooseus.mp4";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Whychooseus() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white py-14 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="w-full h-[360px] overflow-hidden rounded-3xl relative shadow-md">
          <video
            src={whychooseus}
            loop
            muted
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          ></video>

          {/* Video Overlay */}
          <div className="absolute inset-0 bg-slate-900/65 backdrop-blur-[1px] z-10"></div>

          {/* Content Card */}
          <div className="absolute z-20 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center max-w-xl px-6 w-full">
            <span className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              100% Certified Organic
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Handpicked Farm Fruits
            </h3>

            <p className="text-slate-200 text-sm sm:text-base font-medium mb-6 leading-relaxed max-w-md mx-auto">
              Sourced directly from sustainable local farms to ensure uncompromised quality, taste, and daily freshness.
            </p>

            <button 
              onClick={() => navigate('/product-Page')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All Fruits</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Whychooseus;