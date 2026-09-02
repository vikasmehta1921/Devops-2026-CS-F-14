import { useState } from "react";

export default function RoommateCard({ r }) {
  const [interested, setInterested] = useState(false);

  const lifestyleIcons = {
    "Early Bird": "🌅",
    "Night Owl": "🦉",
    "Non-Smoker": "🚭",
    Smoker: "🚬",
    Vegetarian: "🥬",
    "Non-Vegetarian": "🍗",
    "Pet Friendly": "🐾",
    "No Pets": "🚫",
    Clean: "✨",
    Studious: "📚",
    Social: "🎉",
    Quiet: "🤫",
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden group">
      {/* Header with avatar */}
      <div className="relative p-5 pb-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white font-display font-bold text-xl flex-shrink-0 shadow-lg shadow-violet-500/20">
            {r.name?.[0]?.toUpperCase() || "?"}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-white text-lg truncate">
              {r.name}
            </h3>
            <p className="text-slate-400 text-sm">
              {r.age} yrs · {r.occupation}
            </p>
            <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {r.city}
            </p>
          </div>

          {/* Compatibility Badge */}
          {r.compatibility && (
            <div className="flex-shrink-0">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                  r.compatibility >= 80
                    ? "border-green-400/50 text-green-400"
                    : r.compatibility >= 60
                    ? "border-amber-400/50 text-amber-400"
                    : "border-slate-400/50 text-slate-400"
                }`}
              >
                {r.compatibility}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Budget */}
      <div className="px-5 pb-3">
        <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white/[0.03] border border-white/5">
          <span className="text-xs text-slate-500">Budget</span>
          <span className="text-sm font-semibold text-cyan-400">
            ₹{r.budget?.toLocaleString()}/mo
          </span>
        </div>
      </div>

      {/* Lifestyle Tags */}
      <div className="px-5 pb-4">
        <div className="flex flex-wrap gap-1.5">
          {r.lifestyle?.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/5 text-xs text-slate-400"
            >
              {lifestyleIcons[tag] || "•"} {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="px-5 pb-5">
        <button
          onClick={() => setInterested(!interested)}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            interested
              ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
              : "btn-primary !py-2.5"
          }`}
        >
          {interested ? "✓ Interest Sent" : "Connect"}
        </button>
      </div>
    </div>
  );
}
