import { useContext } from "react";
import profileImg from "../../assets/images/user.png";
import { AuthContext } from "../context/Authcontext";
import { ShieldCheck, Award } from "lucide-react";

function ProfileCard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs">
      <div className="flex flex-col items-center text-center">

        <div className="relative">
          <img
            src={profileImg}
            alt="user profile"
            className="w-20 h-20 rounded-full border-2 border-emerald-500 p-0.5 object-cover"
          />
          <div className="absolute bottom-0 right-0 bg-emerald-600 text-white p-1 rounded-full border-2 border-white">
            <ShieldCheck size={12} />
          </div>
        </div>

        <h2 className="text-lg font-extrabold text-slate-900 mt-4">
          {user?.name || "Organic Member"}
        </h2>

        <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-0.5 rounded-full mt-1">
          {user?.email || "valuable.customer@aiwa.com"}
        </p>

        <div className="grid grid-cols-2 gap-3 w-full mt-5">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-center">
            <p className="text-[11px] font-medium text-slate-400">
              Orders Placed
            </p>

            <h3 className="text-xl font-extrabold text-emerald-700 mt-0.5">
              12+
            </h3>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-center">
            <p className="text-[11px] font-medium text-slate-400">
              Harvest Points
            </p>

            <h3 className="text-xl font-extrabold text-emerald-700 mt-0.5">
              450
            </h3>
          </div>
        </div>

        <button className="w-full bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200 py-2.5 rounded-xl text-xs font-bold mt-5 transition-all shadow-2xs">
          Manage Account
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;