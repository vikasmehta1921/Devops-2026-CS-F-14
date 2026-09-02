import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/search", label: "Properties" },
    { to: "/roommates", label: "Roommates" },
  ];

  const authLinks = user
    ? [
        { to: "/wishlist", label: "Wishlist" },
        { to: "/bookings", label: "Bookings" },
        { to: "/history", label: "History" },
        ...(user.role === "owner" ? [{ to: "/owner", label: "Dashboard" }] : []),
        ...(user.role === "admin" ? [{ to: "/admin", label: "Admin" }] : []),
      ]
    : [];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white font-display font-bold text-lg shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
              N
            </div>
            <span className="font-display font-bold text-xl gradient-text hidden sm:inline">
              NestMate
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? "text-white bg-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full" />
                )}
              </Link>
            ))}
            {authLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? "text-white bg-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm text-slate-300">{user.name?.split(" ")[0]}</span>
                </div>
                <button
                  onClick={() => { logout(); nav("/"); }}
                  className="text-sm text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm !py-2 !px-5"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-slate-300 transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-slate-300 transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-slate-300 transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden glass-strong overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[500px] border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {[...navLinks, ...authLinks].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive(link.to)
                  ? "text-white bg-white/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 mt-3">
            {user ? (
              <button
                onClick={() => { logout(); nav("/"); }}
                className="w-full text-left px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                Logout
              </button>
            ) : (
              <div className="space-y-2">
                <Link to="/login" className="block px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5">
                  Login
                </Link>
                <Link to="/register" className="block text-center btn-primary text-sm !py-3">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
