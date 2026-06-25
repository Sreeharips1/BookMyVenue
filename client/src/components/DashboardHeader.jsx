import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardHeader = ({ title, subtitle, role }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
  };
  return (
    <header className="h-20 border-b border-slate-800 px-6 md:px-8 flex items-center justify-between bg-[#09122C]">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>

        <p className="text-slate-400 text-sm md:text-base mt-1">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          <span
            className="
            px-3 py-1
            rounded-full
            text-xs
            font-semibold
            bg-[#CE262620]
            text-[#CE2626]
            border border-[#CE262650]
          "
          >
            {role.toUpperCase()}
          </span>

          <div className="text-white font-medium"> {user?.name}</div>
        </div>

        <button
          className="
          flex items-center gap-2
          px-4 py-2
          rounded-xl
          bg-[#CE2626]
          text-white
          hover:bg-red-700
          transition
        "
        >
          <FiLogOut size={18} />
          <span className="hidden sm:block" onClick={handleLogout}>
            Logout
          </span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
