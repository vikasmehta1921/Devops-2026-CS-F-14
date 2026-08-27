import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Bookings() {
  const { user } = useAuth();
  const [d, setD] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .get("/bookings")
      .then((r) => setD(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const update = async (id, status) => {
    await api.put(`/bookings/${id}`, { status });
    load();
  };

  const statusConfig = {
    pending: { badge: "badge-amber", label: "Pending", icon: "⏳" },
    successful: { badge: "badge-green", label: "Confirmed", icon: "✅" },
    rejected: { badge: "badge-red", label: "Rejected", icon: "❌" },
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-slide-up">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white">
            {user.role === "owner" ? "Booking Requests" : "My Bookings"}
          </h1>
          <p className="text-slate-400 mt-2">
            {user.role === "owner"
              ? "Manage incoming booking requests"
              : "Track your property bookings"}
          </p>
        </div>

        {loading ? (
          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <div className="flex gap-4">
                  <div className="skeleton w-20 h-20 rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <div className="skeleton h-5 w-48 rounded" />
                    <div className="skeleton h-4 w-32 rounded" />
                    <div className="skeleton h-4 w-24 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : d.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              No bookings yet
            </h3>
            <p className="text-slate-400">
              {user.role === "owner"
                ? "Booking requests from tenants will appear here."
                : "When you book a property, it will appear here."}
            </p>
          </div>
        ) : (
          <div className="space-y-4 mt-8">
            {d.map((b, i) => {
              const config = statusConfig[b.status] || statusConfig.pending;
              return (
                <div
                  key={b._id}
                  className="glass-card rounded-2xl p-6 animate-slide-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="font-display font-bold text-lg text-white">
                          {b.property?.title || "Property"}
                        </h2>
                        <span className={`badge ${config.badge}`}>
                          {config.icon} {config.label}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm">
                        {b.property?.city} · ₹
                        {b.property?.rent?.toLocaleString()}/mo
                      </p>
                      <p className="text-slate-500 text-xs mt-2">
                        Booking ID: {b.bookingCode}
                      </p>
                    </div>

                    {/* Owner actions */}
                    {user.role === "owner" && b.status === "pending" && (
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => update(b._id, "successful")}
                          className="px-4 py-2 rounded-xl text-sm font-semibold bg-green-500/15 text-green-400 border border-green-500/25 hover:bg-green-500/25 transition-all"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => update(b._id, "rejected")}
                          className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-500/15 text-red-400 border border-red-500/25 hover:bg-red-500/25 transition-all"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Owner contact on confirmed */}
                  {user.role === "tenant" && b.status === "successful" && (
                    <div className="mt-4 p-4 rounded-xl bg-green-500/5 border border-green-500/15">
                      <p className="font-semibold text-green-400 text-sm mb-2">
                        🎉 Booking confirmed — owner contact unlocked
                      </p>
                      <div className="grid sm:grid-cols-3 gap-2 text-sm text-slate-300">
                        <span>👤 {b.owner?.name}</span>
                        <span>📞 {b.owner?.phone}</span>
                        <span>✉️ {b.owner?.email}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
