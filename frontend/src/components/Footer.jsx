import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white font-display font-bold text-lg">
                N
              </div>
              <span className="font-display font-bold text-xl gradient-text">
                NestMate
              </span>
            </Link>
            <p className="text-slate-500 text-sm mt-4 leading-relaxed">
              Find your perfect rental or ideal roommate. Smart search, secure booking, seamless connections.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {["M24 4.56v14.91A4.56 4.56 0 0119.44 24H4.56A4.56 4.56 0 010 19.44V4.56A4.56 4.56 0 014.56 0h14.88A4.56 4.56 0 0124 4.56z",
                "M23.95 4.57a10 10 0 01-2.82.77 4.96 4.96 0 002.16-2.72 9.9 9.9 0 01-3.13 1.2 4.92 4.92 0 00-8.38 4.48A13.94 13.94 0 011.64 3.16a4.93 4.93 0 001.52 6.57 4.9 4.9 0 01-2.23-.61v.06a4.93 4.93 0 003.95 4.83 4.94 4.94 0 01-2.22.08 4.93 4.93 0 004.6 3.42A9.87 9.87 0 010 19.54a13.94 13.94 0 007.55 2.21c9.05 0 14-7.5 14-14v-.64A9.94 9.94 0 0024 4.56z",
                "M12 2.04a10.03 10.03 0 00-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69C6.73 19.91 6.14 18 6.14 18A2.77 2.77 0 005 16.68c-.95-.65.07-.64.07-.64a2.2 2.2 0 011.6 1.08 2.23 2.23 0 003.06.86 2.21 2.21 0 01.66-1.39c-2.32-.26-4.76-1.16-4.76-5.17a4.04 4.04 0 011.08-2.8 3.76 3.76 0 01.1-2.77s.88-.28 2.88 1.07a9.93 9.93 0 015.24 0c2-1.35 2.87-1.07 2.87-1.07.58 1.44.21 2.51.1 2.77a4.04 4.04 0 011.08 2.8c0 4.02-2.45 4.9-4.78 5.16.38.32.71.96.71 1.94v2.88c0 .28.16.59.67.49A10.03 10.03 0 0022 12.04a10.03 10.03 0 00-10-10z"
              ].map((d, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/search", label: "Properties" },
                { to: "/roommates", label: "Roommates" },
                { to: "/search?propertyType=pg", label: "PG" },
                { to: "/search?propertyType=flat", label: "Flats" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-slate-400 hover:text-violet-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Account</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/login", label: "Login" },
                { to: "/register", label: "Register" },
                { to: "/bookings", label: "Bookings" },
                { to: "/wishlist", label: "Wishlist" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-slate-400 hover:text-violet-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-3">
              Get the latest listings in your inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed!");
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="Email"
                className="input-glass text-sm !py-2.5 flex-1"
              />
              <button className="btn-primary text-sm !py-2.5 !px-4 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} NestMate. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
  
}
