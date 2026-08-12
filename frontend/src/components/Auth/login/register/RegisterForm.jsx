import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function RegisterForm() {
  return (
    <div className="w-full max-w-md bg-white">
      <div className="grid grid-cols-2 gap-4">
        <button className="py-3 border border-gray-200 rounded-xl font-medium flex items-center justify-center gap-3">
          <FcGoogle size={20} />
          Google
        </button>

        <button className="py-3 border border-gray-200 rounded-xl font-medium flex items-center justify-center gap-3">
          <FaApple size={20} />
          Apple
        </button>
      </div>

      <div className="flex items-center gap-4 my-8">
        <div className="h-px bg-gray-200 flex-1"></div>
        <div>Or Register With Email</div>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>

      <form action="">

        <input type="text"  placeholder="Full Name"  className="px-5 py-4 w-full border border-green-200 outline-none mb-6" />
        
      </form>
    </div>
  );
}

export default RegisterForm;