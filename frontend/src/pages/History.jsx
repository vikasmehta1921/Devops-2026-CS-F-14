import { useEffect, useState } from "react";
import api from "../services/api";

export default function History() {
  const [d, setD] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmClear, setConfirmClear] = useState(false);

  const load = () => {
    setLoading(true);
    api
      .get("/history")
      .then((r) => setD(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const clearAll = async () => {
    await api.delete("/history");
    setD([]);
    setConfirmClear(false);
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-slide-up">
          <div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white">
              History
            </h1>
            <p className="text-slate-400 mt-2">
              Your recent searches and property views
            </p>
          </div>
          {d.length > 0 && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {confirmClear ? (
                <>
                  <span className="text-sm text-slate-400">Are you sure?</span>
                  <button
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-500/15 text-red-400 border border-red-500/25 hover:bg-red-500/25 transition-all"
                    onClick={clearAll}
                  >
                    Yes, clear
                  </button>
                  <button
                    className="btn-secondary text-sm !py-2 !px-4"
                    onClick={() => setConfirmClear(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn-secondary text-sm !py-2 !px-4"
                  onClick={() => setConfirmClear(true)}
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="mt-8 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass rounded-xl p-4">
                <div className="flex gap-3 items-center">
                  <div className="skeleton w-10 h-10 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="skeleton h-4 w-40 rounded" />
                    <div className="skeleton h-3 w-24 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : d.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-5xl mb-4">🕒</div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              No history yet
            </h3>
            <p className="text-slate-400">
              Your searches and property views will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-3">
            {d.map((x, i) => (
              <div
                key={x._id}
                className="glass-card rounded-xl p-4 flex items-center gap-4 animate-slide-up"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    x.type === "search"
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "bg-violet-500/10 text-violet-400"
                  }`}
                >
                  {x.type === "search" ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {x.type === "search" ? "Searched" : "Viewed"}{" "}
                    <span className="text-slate-300">
                      {x.query || x.property?.title}
                    </span>
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {new Date(x.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
