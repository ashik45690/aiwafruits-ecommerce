import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Leaf, Mail, ArrowLeft, SendHorizonal } from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function FormHandle(e) {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    try {
      const response = await ForgotpasswordServices(email);
      console.log(response);
      toast.success("OTP has been sent to your email");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-8">

          {/* Brand Icon */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-700 flex items-center justify-center mb-4 shadow-md">
              <Leaf size={26} className="text-white" />
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900">
              Forgot Password?
            </h1>

            <p className="text-slate-500 text-sm font-medium mt-2 max-w-xs">
              No worries! Enter your registered email below and we'll send you a reset OTP.
            </p>
          </div>

          <form onSubmit={FormHandle} className="space-y-5">

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <SendHorizonal size={16} />
              <span>Send Reset OTP</span>
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/user-login"
              className="inline-flex items-center gap-1.5 text-emerald-700 font-bold text-sm hover:underline"
            >
              <ArrowLeft size={15} />
              Back to Sign In
            </Link>
          </div>
        </div>

        <p className="text-center text-xs font-medium text-slate-400 mt-5">
          &copy; {new Date().getFullYear()} Aiwa Fruits &bull; Organic Farm Delivery
        </p>
      </div>

    </div>
  );
}

export default ForgotPassword;