import { X } from "lucide-react";

function CancelButton({
  onCancel,
  text = "Cancel",
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onCancel}
      disabled={disabled}
      className="
        inline-flex
  items-center
  justify-center
  gap-2
  px-4
  py-2.5
  rounded-xl
  border
  border-red-200
  bg-white
  text-sm
  font-semibold
  text-red-600
  shadow-sm
  transition-all
  duration-200
  hover:bg-red-600
  hover:text-white
  hover:border-red-600
  hover:shadow-md
  active:scale-95
  disabled:opacity-50
  disabled:cursor-not-allowed
      "
    >
      <X size={16} />
      {text}
    </button>
  );
}

export default CancelButton;