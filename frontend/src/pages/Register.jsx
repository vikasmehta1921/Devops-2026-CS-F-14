import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "tenant",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      await register(f);
      nav(f.role === "owner" ? "/owner" : "/");
    } catch (x) {
      setErr(x.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <div className="floating-shape w-96 h-96 bg-cyan-500 top-10 -left-32 animate-float" />
        <div className="floating-shape w-72 h-72 bg-violet-600 bottom-20 right-20 animate-float-delayed" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white font-display font-bold text-3xl mx-auto mb-6 shadow-2xl shadow-violet-500/30">
            N
          </div>
          <h2 className="font-display font-bold text-3xl text-white mb-3">
            Join <span className="gradient-text">NestMate</span> today
          </h2>
          <p className="text-slate-400 max-w-sm mx-auto">
            Create your account to list properties, find rentals, or match with
            compatible roommates across India.
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-20 lg:py-12">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile brand */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white font-display font-bold text-2xl mx-auto mb-4 shadow-lg shadow-violet-500/25">
              N
            </div>
            <h1 className="font-display font-bold text-2xl text-white">
              Create account
            </h1>
          </div>

          <div className="glass rounded-2xl p-7 md:p-8">
            <h1 className="font-display font-bold text-2xl text-white hidden lg:block">
              Create account
            </h1>
            <p className="text-slate-400 text-sm mt-1 hidden lg:block">
              Join NestMate — it&apos;s free
            </p>

            {err && (
              <div className="mt-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {err}
              </div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-4">
              {/* Role selector */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: "tenant", icon: "🏠", label: "Tenant" },
                    { key: "owner", icon: "🔑", label: "Owner" },
                  ].map((r) => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setF({ ...f, role: r.key })}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-medium transition-all ${
                        f.role === r.key
                          ? "bg-violet-500/20 border border-violet-500/40 text-violet-300"
                          : "bg-white/5 border border-white/10 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      <span className="text-lg">{r.icon}</span>
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">
                  Full name
                </label>
                <input
                  required
                  className="input-glass"
                  placeholder="John Doe"
                  value={f.name}
                  onChange={(e) => setF({ ...f, name: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">
                  Email
                </label>
                <input
                  required
                  className="input-glass"
                  type="email"
                  placeholder="you@example.com"
                  value={f.email}
                  onChange={(e) => setF({ ...f, email: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">
                  Phone
                </label>
                <input
                  className="input-glass"
                  placeholder="+91 9876543210"
                  value={f.phone}
                  onChange={(e) => setF({ ...f, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">
                  Password
                </label>
                <input
                  required
                  className="input-glass"
                  type="password"
                  placeholder="••••••••"
                  value={f.password}
                  onChange={(e) => setF({ ...f, password: e.target.value })}
                />
              </div>

              <button
                disabled={loading}
                className="btn-primary w-full !py-3.5 font-display font-semibold text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                    </svg>
                    Creating account…
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
                  to="/login"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
