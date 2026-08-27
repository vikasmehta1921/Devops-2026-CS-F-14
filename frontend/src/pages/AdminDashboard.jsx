import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
  const [d, setD] = useState({});
  const [props, setProps] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [a, b] = await Promise.all([
        api.get("/admin/dashboard"),
        api.get("/admin/properties"),
      ]);
      setD(a.data);
      setProps(b.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const statIcons = {
    users: "👥",
    properties: "🏠",
    bookings: "📋",
    enquiries: "💬",
    owners: "🔑",
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-slide-up">
          <span className="badge badge-red mb-3">Admin</span>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white">
            Admin Dashboard
          </h1>
          <p className="text-slate-400 mt-2">
            Platform overview and property verification
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          {Object.entries(d).map(([k, v]) => (
            <div className="glass rounded-2xl p-5" key={k}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {statIcons[k.toLowerCase()] || "📊"}
                </span>
                <div>
                  <p className="text-2xl font-display font-bold text-white">
                    {v}
                  </p>
                  <p className="text-xs text-slate-500 capitalize">{k}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Property Verification */}
        <h2 className="font-display font-bold text-xl text-white mt-12 mb-5">
          Property Verification
        </h2>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-2xl p-5">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="skeleton h-5 w-48 rounded" />
                    <div className="skeleton h-4 w-32 rounded" />
                  </div>
                  <div className="skeleton h-9 w-20 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : props.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              All caught up!
            </h3>
            <p className="text-slate-400">
              No properties pending verification.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {props.map((p, i) => (
              <div
                className="glass-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-slide-up"
                style={{ animationDelay: `${i * 0.05}s` }}
                key={p._id}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display font-bold text-white">
                      {p.title}
                    </h3>
                    <span
                      className={`badge ${
                        p.verified ? "badge-green" : "badge-amber"
                      }`}
                    >
                      {p.verified ? "Verified" : "Pending"}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">
                    👤 {p.owner?.name} · {p.city} · ₹
                    {p.rent?.toLocaleString()}/mo
                  </p>
                </div>
                {!p.verified && (
                  <button
                    onClick={async () => {
                      await api.put(`/admin/properties/${p._id}/verify`);
                      load();
                    }}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-green-500/15 text-green-400 border border-green-500/25 hover:bg-green-500/25 transition-all flex-shrink-0"
                  >
                    ✓ Verify
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
