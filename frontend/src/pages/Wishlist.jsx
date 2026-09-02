import { useEffect, useState } from "react";
import api from "../services/api";
import PropertyCard from "../components/PropertyCard";
import SkeletonCard from "../components/SkeletonCard";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const load = () => {
    setLoading(true);
    api
      .get("/favorites")
      .then((r) => setFavorites(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const remove = async (propertyId) => {
    await api.delete(`/favorites/${propertyId}`);
    setFavorites((prev) => prev.filter((f) => f.property?._id !== propertyId));
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-slide-up">
          <div>
            <span className="badge badge-violet mb-3">Wishlist</span>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white">
              My Wishlist
            </h1>
            <p className="text-slate-400 mt-2">
              {loading
                ? "Loading…"
                : `${favorites.length} saved ${favorites.length === 1 ? "property" : "properties"}`}
            </p>
          </div>
          {!loading && favorites.length > 0 && (
            <button
              onClick={() => nav("/search")}
              className="btn-secondary text-sm flex-shrink-0"
            >
              Browse more →
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {favorites.map((fav, i) => {
              const p = fav.property;
              if (!p) return null;
              return (
                <div
                  key={fav._id}
                  className="relative animate-slide-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <PropertyCard p={p} />
                  {/* Remove from wishlist button */}
                  <button
                    onClick={() => remove(p._id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center text-white transition-all hover:scale-110 z-10"
                    title="Remove from wishlist"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-6xl mb-4">💜</div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-slate-400 mb-6">
              Tap the ♡ heart icon on any property card to save it here.
            </p>
            <button onClick={() => nav("/search")} className="btn-primary">
              Browse Properties
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
