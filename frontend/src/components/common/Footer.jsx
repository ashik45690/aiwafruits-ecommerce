import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-emerald-950 text-slate-100 pt-16 pb-8 px-4 sm:px-6 border-t border-emerald-900">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-emerald-900/80">

          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-white tracking-tight">Aiwa</span>
              <span className="text-2xl font-extrabold text-emerald-400 tracking-tight">Fruits</span>
            </div>
            <p className="text-sm text-emerald-200/80 leading-relaxed max-w-sm">
              We deliver fresh, 100% certified organic fruits directly from sustainable farms to your doorstep with guaranteed quality and care.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-emerald-900/80 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors">
                <CiFacebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-emerald-900/80 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-emerald-900/80 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors">
                <FaTwitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base text-white mb-4 uppercase tracking-wider text-xs text-emerald-400">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm text-emerald-200/80 font-medium">
              <li>
                <Link to="/" className="hover:text-emerald-300 transition-colors inline-flex items-center gap-1 group">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/product-Page" className="hover:text-emerald-300 transition-colors inline-flex items-center gap-1 group">
                  <span>Fresh Fruits</span>
                </Link>
              </li>
              <li>
                <Link to="/Myorders" className="hover:text-emerald-300 transition-colors inline-flex items-center gap-1 group">
                  <span>My Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/Dashboard" className="hover:text-emerald-300 transition-colors inline-flex items-center gap-1 group">
                  <span>Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="font-bold text-base text-white mb-4 uppercase tracking-wider text-xs text-emerald-400">Customer Care</h3>
            <ul className="space-y-2.5 text-sm text-emerald-200/80 font-medium">
              <li className="hover:text-emerald-300 transition-colors cursor-pointer">Help & FAQs</li>
              <li className="hover:text-emerald-300 transition-colors cursor-pointer">Shipping & Delivery</li>
              <li className="hover:text-emerald-300 transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-emerald-300 transition-colors cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-bold text-base text-white mb-4 uppercase tracking-wider text-xs text-emerald-400">Get In Touch</h3>
            <div className="space-y-3.5 text-sm text-emerald-200/80">
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                <span>+91 7356884862</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                <span>aiwafruitshelp@gmail.com</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                <span>Malappuram, Kolathur, Kerala</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <p>© 2026 Aiwa Fruits. All rights reserved.</p>
          <div className="flex items-center gap-6 font-medium">
            <span className="hover:text-emerald-200 cursor-pointer transition">Organic Certified</span>
            <span className="hover:text-emerald-200 cursor-pointer transition">Farm Fresh</span>
            <span className="hover:text-emerald-200 cursor-pointer transition">Fast Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

