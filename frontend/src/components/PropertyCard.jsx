import { Link } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function PropertyCard({ p }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const img =
    p.images?.[0] ||
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80";

  const fav = async () => {
    if (!user) return alert("Please login first");
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);
    if (liked) {
      await api.delete(`/favorites/${p._id}`);
      setLiked(false);
    } else {
      await api.post("/favorites", { propertyId: p._id });
      setLiked(true);
    }
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={img}
          alt={p.title}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

        {/* Type Badge */}
        <span className="absolute top-3 left-3 badge badge-violet">
          {p.propertyType}
        </span>

        {/* Heart Button */}
        <button
          onClick={fav}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            animating ? "scale-125" : ""
          }`}
        >
          <span className={`text-lg ${liked ? "text-red-400" : "text-white/70"}`}>
            {liked ? "❤️" : "♡"}
          </span>
        </button>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <p className="text-white font-bold text-lg">
            ₹{p.rent?.toLocaleString()}
            <span className="text-sm font-normal text-white/60"> /month</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link
          to={`/properties/${p._id}`}
          className="font-display font-bold text-lg text-white hover:text-violet-400 transition-colors block leading-tight"
        >
          {p.title}
        </Link>
        <p className="text-slate-400 text-sm mt-1.5 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {p.locality}, {p.city}
        </p>

        {/* Details row */}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {p.furnishing}
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-400">{p.bedrooms} bed</span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-cyan-400 flex items-center gap-0.5">
            ⭐ {p.ratingAvg?.toFixed(1) || "New"}
          </span>
        </div>
      </div>
    </div>
  );
}
