import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Leaf,
  Mail,
  ArrowLeft,
  SendHorizonal,
  ShieldCheck,
  LockKeyhole,
} from "lucide-react";

import {
  ForgotpasswordServices,
  VerifyOTPService,
  ResetPasswordService,
} from "../../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [resetToken, setResetToken] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function FormHandle(e) {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    try {
      setLoading(true);

      const response = await ForgotpasswordServices(email.trim());

      console.log(response);

      if (response?.success) {
        toast.success("OTP has been sent to your email");
        setStep(2);
      } else {
        toast.error(response?.message || "Failed to send OTP");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.message ||
          error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  async function VerifyOTP(e) {
    e.preventDefault();

    if (!otp.trim()) {
      return toast.error("Please enter the OTP");
    }

    if (otp.length !== 6) {
      return toast.error("OTP must contain 6 digits");
    }

    try {
      setLoading(true);

      const response = await VerifyOTPService(
        email.trim(),
        otp
      );

      console.log(response);

      if (response?.success) {
        setResetToken(response.resetToken);

        toast.success("OTP verified successfully");

        setStep(3);
      } else {
        toast.error(response?.message || "Invalid OTP");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.message ||
          error?.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  }

  async function ResetPassword(e) {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (newPassword.length < 6) {
      return toast.error(
        "Password must contain at least 6 characters"
      );
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await ResetPasswordService(
        resetToken,
        newPassword,
        confirmPassword
      );

      console.log(response);

      if (response?.success) {
        toast.success("Password reset successfully");

        setTimeout(() => {
          navigate("/user-login");
        }, 1200);
      } else {
        toast.error(
          response?.message || "Failed to reset password"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.message ||
          error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  async function ResendOTP() {
    try {
      setLoading(true);

      const response = await ForgotpasswordServices(
        email.trim()
      );

      if (response?.success) {
        toast.success("New OTP sent to your email");

        setOtp("");
      } else {
        toast.error(
          response?.message || "Failed to resend OTP"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.message ||
          error?.response?.data?.message ||
          "Failed to resend OTP"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-8">

          <div className="flex flex-col items-center text-center mb-8">

            <div className="w-14 h-14 rounded-2xl bg-emerald-700 flex items-center justify-center mb-4 shadow-md">
              <Leaf size={26} className="text-white" />
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900">

              {step === 1 && "Forgot Password?"}

              {step === 2 && "Verify OTP"}

              {step === 3 && "Create New Password"}

            </h1>

            <p className="text-slate-500 text-sm font-medium mt-2 max-w-xs">

              {step === 1 &&
                "No worries! Enter your registered email below and we'll send you a reset OTP."}

              {step === 2 &&
                `Enter the 6-digit OTP sent to ${email}`}

              {step === 3 &&
                "Create a new secure password for your Aiwa Fruits account."}

            </p>

          </div>


          {step === 1 && (

            <form
              onSubmit={FormHandle}
              className="space-y-5"
            >

              <div>

                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                  />

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >

                <SendHorizonal size={16} />

                <span>
                  {loading
                    ? "Sending OTP..."
                    : "Send Reset OTP"}
                </span>

              </button>

            </form>

          )}


          {step === 2 && (

            <form
              onSubmit={VerifyOTP}
              className="space-y-5"
            >

              <div>

                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Enter OTP
                </label>

                <div className="relative">

                  <ShieldCheck
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold tracking-[0.4em] text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                  />

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >

                <ShieldCheck size={17} />

                <span>
                  {loading
                    ? "Verifying..."
                    : "Verify OTP"}
                </span>

              </button>


              <div className="text-center">

                <button
                  type="button"
                  onClick={ResendOTP}
                  disabled={loading}
                  className="text-emerald-700 font-bold text-sm hover:underline disabled:opacity-50 cursor-pointer"
                >
                  Resend OTP
                </button>

              </div>


              <div className="text-center">

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp("");
                  }}
                  className="text-slate-500 font-semibold text-sm hover:text-emerald-700"
                >
                  Change Email
                </button>

              </div>

            </form>

          )}


          {step === 3 && (

            <form
              onSubmit={ResetPassword}
              className="space-y-5"
            >

              <div>

                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  New Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                  />

                </div>

              </div>


              <div>

                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Confirm Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                  />

                </div>

              </div>


              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >

                <LockKeyhole size={17} />

                <span>
                  {loading
                    ? "Updating Password..."
                    : "Reset Password"}
                </span>

              </button>

            </form>

          )}


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