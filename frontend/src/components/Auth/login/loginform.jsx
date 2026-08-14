import { Eye, EyeOff, Leaf, ArrowRight, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { loginservices } from "../../../services/authService";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Loginfrom() {
  const [LoginformData, setLoginformData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [validationError, setvalidationError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  function EventHandle(e) {
    const { value, name } = e.target;
    setLoginformData({
      ...LoginformData,
      [name]: value,
    });
  }

  const formValidation = () => {
    const Error = {};
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!LoginformData.email.trim().toLocaleLowerCase()) {
      Error.email = "Email is Required";
    }
    if (!EmailRegex.test(LoginformData.email)) {
      Error.emailFormat = "Please enter a valid email address";
    }
    if (!LoginformData.password.trim()) {
      Error.password = "Password is Required";
    }

    setvalidationError(Error);
    return Object.keys(Error).length === 0;
  };

  async function FormHandle(e) {
    e.preventDefault();

    try {
      const valid = formValidation();
      if (!valid) return;

      const resposnse = await loginservices(LoginformData);

      if (resposnse.success) {
        toast.success(resposnse.message);
        setUser(resposnse.user);
        navigate("/");
      } else {
        toast.error(resposnse.message);
      }
    } catch (error) {
      console.log(error, "something wrong");
    }
  }

  return (
    <div className="w-full max-w-md">

      {/* Brand Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
        
          <span className="text-sm font-extrabold text-emerald-800">AIWA FRUITS</span>
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
          Welcome back 
        </h2>
        <p className="text-slate-500 text-sm font-medium mt-1.5">
          Sign in to continue your healthy journey.
        </p>
      </div>

      <form onSubmit={FormHandle} className="space-y-4">

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              onChange={EventHandle}
            />
          </div>
          {(validationError?.email || validationError?.emailFormat) && (
            <p className="text-xs mt-1 text-rose-600 font-medium">
              {validationError?.email || validationError?.emailFormat}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              onChange={EventHandle}
              className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {validationError.password && (
            <p className="text-xs mt-1 text-rose-600 font-medium">
              {validationError.password}
            </p>
          )}
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-emerald-700 rounded cursor-pointer" />
            Remember Me
          </label>

          <button
            type="button"
            className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          <span>Sign In to Continue</span>
          <ArrowRight size={16} />
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="bg-slate-200 h-px flex-1" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or continue with</p>
        <div className="bg-slate-200 h-px flex-1" />
      </div>

      <div className="grid grid-cols-1 gap-3">
         <button
                  type="button"
                  className="py-2.5 border border-slate-200 hover:border-slate-300 rounded-xl font-bold text-sm text-slate-700 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <FcGoogle size={18} />
                  Google
                </button>
      </div>

      <p className="text-center text-xs font-semibold text-slate-500 mt-7">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => navigate("/user-Register")}
          className="text-emerald-700 font-extrabold hover:underline cursor-pointer"
        >
          Create Account
        </button>
      </p>
    </div>
  );
}

export default Loginfrom;
