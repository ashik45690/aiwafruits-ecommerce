import { useState } from "react";
import { ShippingformValidation } from "../../validation/validation";
import { ArrowRight, MapPin } from "lucide-react";

function ShippingForm({ setStep, CheckoutData, setCheckoutData }) {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleForm = (e) => {
    const { name, value } = e.target;

    const updatedShipping = {
      ...CheckoutData.shipping,
      [name]: value,
    };

    setCheckoutData((prev) => ({
      ...prev,
      shipping: updatedShipping,
    }));

    if (!submitted) return;

    const result = ShippingformValidation.safeParse(updatedShipping);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
    } else {
      setErrors({});
    }
  };

  const handleNext = () => {
    setSubmitted(true);

    const result = ShippingformValidation.safeParse(
      CheckoutData.shipping
    );

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    setStep(2);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
          <MapPin size={20} />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Shipping Address</h2>
          <p className="text-xs text-slate-500 font-medium">Enter your delivery location details</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">First Name</label>
            <input
              type="text"
              name="firstName"
              value={CheckoutData.shipping.firstName}
              onChange={handleForm}
              placeholder="e.g. John"
              className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all ${
                errors.firstName 
                  ? "border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-200" 
                  : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              }`}
            />
            {errors.firstName && (
              <p className="text-rose-500 text-xs mt-1 font-semibold">
                {errors.firstName[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={CheckoutData.shipping.lastName}
              onChange={handleForm}
              placeholder="e.g. Doe"
              className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all ${
                errors.lastName 
                  ? "border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-200" 
                  : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              }`}
            />
            {errors.lastName && (
              <p className="text-rose-500 text-xs mt-1 font-semibold">
                {errors.lastName[0]}
              </p>
            )}
          </div>
        </div>

        {/* Street */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Street Address</label>
          <input
            type="text"
            name="street"
            value={CheckoutData.shipping.street}
            onChange={handleForm}
            placeholder="House #, Street name, Area"
            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all ${
              errors.street 
                ? "border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-200" 
                : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            }`}
          />
          {errors.street && (
            <p className="text-rose-500 text-xs mt-1 font-semibold">
              {errors.street[0]}
            </p>
          )}
        </div>

        {/* City & Postal Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">City</label>
            <input
              type="text"
              name="city"
              value={CheckoutData.shipping.city}
              onChange={handleForm}
              placeholder="e.g. Malappuram"
              className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all ${
                errors.city 
                  ? "border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-200" 
                  : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              }`}
            />
            {errors.city && (
              <p className="text-rose-500 text-xs mt-1 font-semibold">
                {errors.city[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Postal / ZIP Code</label>
            <input
              type="text"
              name="postalCode"
              value={CheckoutData.shipping.postalCode}
              onChange={handleForm}
              placeholder="e.g. 679338"
              className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all ${
                errors.postalCode 
                  ? "border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-200" 
                  : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              }`}
            />
            {errors.postalCode && (
              <p className="text-rose-500 text-xs mt-1 font-semibold">
                {errors.postalCode[0]}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={handleNext}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue To Delivery Method</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default ShippingForm;