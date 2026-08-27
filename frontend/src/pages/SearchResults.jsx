import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import PropertyCard from "../components/PropertyCard";
import SkeletonCard from "../components/SkeletonCard";

export default function SearchResults() {
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const city = params.get("city") || "";
  const propertyType = params.get("propertyType") || "";
  const furnishing = params.get("furnishing") || "";
  const minRent = params.get("minRent") || "";
  const maxRent = params.get("maxRent") || "";
  const sort = params.get("sort") || "";

  useEffect(() => {
    setLoading(true);
    const q = new URLSearchParams({
      city,
      propertyType,
      furnishing,
      minRent,
      maxRent,
      sort,
      limit: "24",
    });
    api
      .get("/properties?" + q.toString())
      .then((r) => {
        setData(r.data.data);
        setTotal(r.data.total);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [city, propertyType, furnishing, minRent, maxRent, sort]);

  const set = (k, v) => {
    const n = new URLSearchParams(params);
    if (v) n.set(k, v);
    else n.delete(k);
    setParams(n);
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white">
            {city ? (
              <>
                Properties in <span className="gradient-text">{city}</span>
              </>
            ) : (
              "All Properties"
            )}
          </h1>
          <p className="text-slate-400 mt-2">
            {loading
              ? "Searching…"
              : `${total} ${total === 1 ? "property" : "properties"} found`}
          </p>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-5 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">City</label>
              <input
                className="input-glass text-sm"
                placeholder="Any city"
                value={city}
                onChange={(e) => set("city", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Type</label>
              <select
                className="select-glass text-sm"
                value={propertyType}
                onChange={(e) => set("propertyType", e.target.value)}
              >
                <option value="">All types</option>
                <option value="flat">Flat</option>
                <option value="apartment">Apartment</option>
                <option value="pg">PG</option>
                <option value="hostel">Hostel</option>
                <option value="room">Room</option>
                <option value="house">House</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Furnishing</label>
              <select
                className="select-glass text-sm"
                value={furnishing}
                onChange={(e) => set("furnishing", e.target.value)}
              >
                <option value="">Any</option>
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Min Rent</label>
              <input
                className="input-glass text-sm"
                placeholder="₹ Min"
                type="number"
                value={minRent}
                onChange={(e) => set("minRent", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Max Rent</label>
              <input
                className="input-glass text-sm"
                placeholder="₹ Max"
                type="number"
                value={maxRent}
                onChange={(e) => set("maxRent", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Sort</label>
              <select
                className="select-glass text-sm"
                value={sort}
                onChange={(e) => set("sort", e.target.value)}
              >
                <option value="">Newest</option>
                <option value="rent_asc">Rent: Low to High</option>
                <option value="rent_desc">Rent: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : data.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.map((p) => (
              <PropertyCard key={p._id} p={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              No properties found
            </h3>
            <p className="text-slate-400">
              Try adjusting your filters or searching a different city.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
