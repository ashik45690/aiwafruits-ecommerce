import heroImg from "../../assets/images/hero.png";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Truck, Sparkles, ArrowRight } from "lucide-react";

function HeroSection() {
  const imageRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.to(imageRef.current, {
      y: -12,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  });

  return (
    <section className="w-full bg-gradient-to-b from-emerald-50/50 via-white to-white py-12 md:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-16">
        
        {/* Left Content */}
        <div className="max-w-xl space-y-6">
          
         

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
            Fresh Fruits Delivered <br />
            <span className="text-emerald-700 ">To Your Doorstep</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
            Experience peak seasonal flavor with our hand-picked organic selection. Directly harvested from sustainable orchards and delivered fresh within 24 hours.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button 
              onClick={() => navigate('/product-Page')}
              className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all py-3.5 px-8 flex items-center gap-2 cursor-pointer"
            >
              <span>Shop Fresh Fruits</span>
              <ArrowRight size={18} />
            </button>

            <button 
              onClick={() => navigate('/product-Page')}
              className="bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50/80 px-7 py-3.5 rounded-xl text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              Explore Catalog
            </button>
          </div>

          {/* Quick Value Props */}
         

        </div>

        {/* Right Hero Visual */}
        <div className="flex justify-center md:justify-end relative">
          <div className="absolute inset-0 bg-emerald-100/40 rounded-full filter blur-3xl -z-10 transform scale-90"></div>
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center p-4">
            <img
              src={heroImg}
              alt="Fresh Organic Fruits Basket"
              ref={imageRef}
              className="w-full h-full object-contain "
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
