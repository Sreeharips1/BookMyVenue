import { X, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginRequiredModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
      bg-black/70 backdrop-blur-sm"
    >
      <div
        className="
        relative
        w-[90%]
        max-w-md
        rounded-3xl
        bg-[#13203D]
        border
        border-slate-700
        shadow-2xl
        p-8
      "
      >
        {/* Close Button */}

        <button
          onClick={onClose}
          className="
          absolute
          right-5
          top-5
          text-slate-400
          hover:text-white
          transition
        "
        >
          <X size={22} />
        </button>

        {/* Icon */}

        <div className="flex justify-center">
          <div className="bg-[#CE2626]/20 p-5 rounded-full">
            <Lock size={40} className="text-[#CE2626]" />
          </div>
        </div>

        {/* Title */}

        <h2 className="text-3xl font-bold text-white text-center mt-6">
          Login Required
        </h2>

        <p className="text-center text-slate-400 mt-3">
          Please login or create an account to continue booking this venue.
        </p>

        {/* Buttons */}

        <div className="space-y-3 mt-8">
          <button
            onClick={() => navigate("/user/login")}
            className="
              w-full
              bg-[#CE2626]
              hover:bg-red-700
              py-3
              rounded-xl
              text-white
              font-semibold
              transition
            "
          >
            Login
          </button>

          <button
            onClick={() => navigate("/user/register")}
            className="
              w-full
              border
              border-[#CE2626]
              text-[#CE2626]
              py-3
              rounded-xl
              font-semibold
              hover:bg-[#CE2626]
              hover:text-white
              transition
            "
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
