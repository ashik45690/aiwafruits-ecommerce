import { useState } from "react";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { registerservice } from "../../../services/authService";
import { toast } from "react-toastify";
import { RegisterValidation } from "../../../validation/validation";
import { Leaf, User, Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  const [RegisterFromData, SetRegisterFormData] = useState({
    fullname: "",
    email: "",
    Password: "",
    confirmpassword: "",
    checkbox: false,
  });

  const [NewError, SetNewError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function eventHandle(e) {
    const { value, name, type, checked } = e.target;

    SetRegisterFormData({
      ...RegisterFromData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (NewError[name]) {
      SetNewError((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  }

  async function FetchDataHandle() {
    try {
      const response = await registerservice(RegisterFromData);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function FormHandle(e) {
    e.preventDefault();

    const isAllEmpty =
      !RegisterFromData.fullname.trim() &&
      !RegisterFromData.email.trim() &&
      !RegisterFromData.Password.trim() &&
      !RegisterFromData.confirmpassword.trim() &&
      !RegisterFromData.checkbox;

    if (isAllEmpty) {
      toast.error("All fields are required");
      return;
    }

    const result = RegisterValidation.safeParse(RegisterFromData);

    if (!result.success) {
      const errors = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      SetNewError(errors);
      return;
    }

    SetNewError({});
    await FetchDataHandle();
  }

  return (
    <div className="w-full max-w-md">

      {/* Brand Header */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center">
            <Leaf size={16} className="text-white" />
          </div>
          <span className="text-sm font-extrabold text-emerald-800">AIWA FRUITS</span>
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
          Create your account 🌱
        </h2>
        <p className="text-slate-500 text-sm font-medium mt-1.5">
          Start your fresh organic journey today.
        </p>
      </div>

      {/* Social Sign-up */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          className="py-2.5 border border-slate-200 hover:border-slate-300 rounded-xl font-bold text-sm text-slate-700 flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <FcGoogle size={18} />
          Google
        </button>

        <button
          type="button"
          className="py-2.5 border border-slate-200 hover:border-slate-300 rounded-xl font-bold text-sm text-slate-700 flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <FaApple size={18} />
          Apple
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="h-px bg-slate-200 flex-1" />
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or with email</div>
        <div className="h-px bg-slate-200 flex-1" />
      </div>

      <form onSubmit={FormHandle} className="space-y-4">

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="fullName"
              type="text"
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              onChange={eventHandle}
              name="fullname"
              value={RegisterFromData.fullname}
            />
          </div>
          {NewError.fullname && (
            <p className="text-xs mt-1 text-rose-600 font-medium">{NewError.fullname}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="Email" className="block text-xs font-bold text-slate-700 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="Email"
              type="email"
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              onChange={eventHandle}
              name="email"
              value={RegisterFromData.email}
            />
          </div>
          {NewError.email && (
            <p className="text-xs mt-1 text-rose-600 font-medium">{NewError.email}</p>
          )}
        </div>

        {/* Password + Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label htmlFor="password" className="block text-xs font-bold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={eventHandle}
                name="Password"
                value={RegisterFromData.Password}
                className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
              </button>
            </div>
            {NewError.Password && (
              <p className="text-xs mt-1 text-rose-600 font-medium">{NewError.Password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-700 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={eventHandle}
                name="confirmpassword"
                value={RegisterFromData.confirmpassword}
                className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                tabIndex={-1}
              >
                {showConfirmPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
              </button>
            </div>
            {NewError.confirmpassword && (
              <p className="text-xs mt-1 text-rose-600 font-medium">{NewError.confirmpassword}</p>
            )}
          </div>
        </div>

        {/* Terms */}
        <div>
          <div className="flex items-start gap-2.5 pt-1">
            <input
              id="terms"
              type="checkbox"
              className="mt-1 h-4 w-4 cursor-pointer rounded accent-emerald-700"
              name="checkbox"
              checked={RegisterFromData.checkbox}
              onChange={eventHandle}
            />
            <label htmlFor="terms" className="text-xs leading-5 text-slate-600 font-medium cursor-pointer">
              I agree to the{" "}
              <span className="font-bold text-emerald-800 cursor-pointer hover:underline">Terms & Conditions</span>{" "}
              and{" "}
              <span className="font-bold text-emerald-800 cursor-pointer hover:underline">Privacy Policy</span>.
            </label>
          </div>
          {NewError.checkbox && (
            <p className="text-xs mt-1 text-rose-600 font-medium">{NewError.checkbox}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Create My Account</span>
          <ArrowRight size={16} />
        </button>

        <p className="text-center text-xs font-semibold text-slate-500 pt-1">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/user-login")}
            className="text-emerald-700 font-extrabold hover:underline cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;