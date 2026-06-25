import { Link } from "react-router-dom";

import Footer from "../components/Footer";

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#09122C] text-white flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#13203D] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <h1 className="text-3xl font-bold text-[#CE2626]">BookMyVenue</h1>

            <span className="text-sm text-slate-400">
              Community Venue Platform
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#discover" className="hover:text-[#CE2626]">
              Discover
            </a>

            <a href="#about" className="hover:text-[#CE2626]">
              About
            </a>

            <a href="#contact" className="hover:text-[#CE2626]">
              Contact
            </a>
          </nav>

          {/* Buttons */}
          <div className="flex gap-3">
            <Link
              to="/user/login"
              className="px-5 py-2 rounded-lg border border-[#CE2626] hover:bg-[#CE2626]"
            >
              Login
            </Link>

            <Link
              to="/user/register"
              className="px-5 py-2 rounded-lg bg-[#CE2626] hover:bg-red-700"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
