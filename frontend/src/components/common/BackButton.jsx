import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BackButton({ label = "Back", to, className = "" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-100 rounded-xl transition-all duration-200 shadow-xs hover:shadow-sm cursor-pointer ${className}`}
      aria-label={label}
    >
      <ArrowLeft size={16} className="text-emerald-700 transition-transform group-hover:-translate-x-0.5" />
      <span>{label}</span>
    </button>
  );
}

export default BackButton;
