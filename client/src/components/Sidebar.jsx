import {
  FiSearch,
  FiCalendar,
  FiUser,
  FiGrid,
  FiHome,
  FiPlusCircle,
} from "react-icons/fi";

import { NavLink, Link } from "react-router-dom";

const Sidebar = ({ role }) => {
  const userLinks = [
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: <FiHome />,
    },
    {
      name: "Discover",
      path: "/user/discover",
      icon: <FiSearch />,
    },
    {
      name: "My Bookings",
      path: "/user/Mybooking",
      icon: <FiCalendar />,
    },
    {
      name: "Profile",
      path: "/user/profile",
      icon: <FiUser />,
    },
  ];

  const ownerLinks = [
    {
      name: "Dashboard",
      path: "/owner/dashboard",
      icon: <FiHome />,
    },
    {
      name: "My Venues",
      path: "/owner/venues",
      icon: <FiGrid />,
    },
    {
      name: "Add Venue",
      path: "/owner/add-venue",
      icon: <FiPlusCircle />,
    },
    {
      name: "Bookings",
      path: "/owner/bookings",
      icon: <FiCalendar />,
    },
    {
      name: "Profile",
      path: "/owner/profile",
      icon: <FiUser />,
    },
  ];

  const links = role === "owner" ? ownerLinks : userLinks;

  return (
    <aside className="w-64 min-h-screen bg-[#09122C] border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <Link to="/">
          <h1 className="text-2xl font-bold text-[#CE2626]">BookMyVenue</h1>

          <p className="text-xs text-slate-400 mt-1">
            Community Venue Platform
          </p>
        </Link>
      </div>

      <nav className="px-3 py-4 flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-[#CE2626] text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            {link.icon}

            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-4 border-t border-slate-800">
        <p className="text-xs text-slate-500 text-center">BookMyVenue MVP v1</p>
      </div>
    </aside>
  );
};

export default Sidebar;
