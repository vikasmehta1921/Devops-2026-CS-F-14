import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import RoommateCard from "../components/RoommateCard";
import SkeletonCard from "../components/SkeletonCard";
import { useAuth } from "../context/AuthContext";

export default function Roommates() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const nav = useNavigate();

  const cityFromUrl = searchParams.get("city") || "";
  const [city, setCity] = useState(cityFromUrl);
  const [budgetMax, setBudgetMax] = useState("");
  const [lifestyleFilter, setLifestyleFilter] = useState("");

  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users who have set city/budget preferences — using GET /api/properties/recommended
  // pattern: fetch users from users/profile endpoint or properties with user prefs
  // Since backend doesn't have a dedicated roommates endpoint, we show users
  // who match via /api/users with their preferences
  useEffect(() => {
    setLoading(true);
    // Build query params for filtering
    const q = new URLSearchParams();
    if (city) q.set("city", city);
    if (budgetMax) q.set("maxRent", budgetMax);

    // Try fetching recommended properties which uses user preferences
    // For roommates we use the same user preference model
    api
      .get("/properties?" + q.toString() + "&limit=1") // lightweight ping to check connectivity
      .then(() => {
        // Backend connected — show mock roommates enriched with real city filter
        setRoommates(getMockRoommates(city, budgetMax, lifestyleFilter));
      })
      .catch(() => {
        setRoommates(getMockRoommates(city, budgetMax, lifestyleFilter));
      })
      .finally(() => setLoading(false));
  }, [city, budgetMax, lifestyleFilter]);

  const updateCity = (v) => {
    setCity(v);
    const next = new URLSearchParams(searchParams);
    if (v) next.set("city", v);
    else next.delete("city");
    setSearchParams(next);
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-slide-up">
          <div>
            <span className="badge badge-cyan mb-3">Roommate Finder</span>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white">
              Find your ideal{" "}
              <span className="gradient-text">roommate</span>
            </h1>
            <p className="text-slate-400 mt-2">
              Browse profiles and connect with compatible roommates
            </p>
          </div>
          <button
            onClick={() => (user ? nav("/roommate-profile") : nav("/login"))}
            className="btn-primary flex-shrink-0"
          >
            Create My Profile
          </button>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-5 mt-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">City</label>
              <input
                className="input-glass text-sm"
                placeholder="Any city"
                value={city}
                onChange={(e) => updateCity(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Max Budget (₹/month)</label>
              <input
                className="input-glass text-sm"
                placeholder="e.g. 15000"
                type="number"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Lifestyle</label>
              <select
                className="select-glass text-sm"
                value={lifestyleFilter}
                onChange={(e) => setLifestyleFilter(e.target.value)}
              >
                <option value="">Any</option>
                <option value="Early Bird">Early Bird</option>
                <option value="Night Owl">Night Owl</option>
                <option value="Non-Smoker">Non-Smoker</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Pet Friendly">Pet Friendly</option>
                <option value="Studious">Studious</option>
                <option value="Social">Social</option>
                <option value="Clean">Clean</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-slate-500 text-sm mt-5 mb-4">
          {loading ? "Finding roommates…" : `${roommates.length} roommate${roommates.length !== 1 ? "s" : ""} found`}
        </p>

        {/* Roommate Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : roommates.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {roommates.map((r, i) => (
              <div key={r.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <RoommateCard r={r} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              No roommates found
            </h3>
            <p className="text-slate-400 mb-6">
              Try adjusting your filters or search a different city.
            </p>
            <button onClick={() => nav("/roommate-profile")} className="btn-primary">
              Be the first to create a profile!
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

// Sample roommate data — will be replaced once a dedicated /api/roommates
// endpoint is added to the backend by your team
function getMockRoommates(city, budgetMax, lifestyleFilter) {
  const all = [
    { id: "r1", name: "Arjun Sharma", age: 24, occupation: "Software Engineer", city: "Bangalore", budget: 12000, lifestyle: ["Early Bird", "Non-Smoker", "Vegetarian", "Clean"], compatibility: 92 },
    { id: "r2", name: "Priya Mehta", age: 22, occupation: "Design Student", city: "Mumbai", budget: 8000, lifestyle: ["Night Owl", "Non-Smoker", "Pet Friendly", "Social"], compatibility: 85 },
    { id: "r3", name: "Rahul Verma", age: 26, occupation: "Marketing Manager", city: "Delhi", budget: 15000, lifestyle: ["Early Bird", "Non-Smoker", "Non-Vegetarian", "Studious"], compatibility: 78 },
    { id: "r4", name: "Sneha Patel", age: 23, occupation: "Data Analyst", city: "Pune", budget: 10000, lifestyle: ["Night Owl", "Non-Smoker", "Vegetarian", "Quiet"], compatibility: 88 },
    { id: "r5", name: "Karan Singh", age: 25, occupation: "Freelancer", city: "Bangalore", budget: 9000, lifestyle: ["Night Owl", "Non-Smoker", "Non-Vegetarian", "Social"], compatibility: 72 },
    { id: "r6", name: "Ananya Gupta", age: 21, occupation: "Medical Student", city: "Hyderabad", budget: 7000, lifestyle: ["Early Bird", "Non-Smoker", "Vegetarian", "Studious"], compatibility: 95 },
    { id: "r7", name: "Vikram Reddy", age: 27, occupation: "Product Manager", city: "Bangalore", budget: 18000, lifestyle: ["Early Bird", "Non-Smoker", "Non-Vegetarian", "Clean"], compatibility: 81 },
    { id: "r8", name: "Meera Joshi", age: 24, occupation: "UX Researcher", city: "Mumbai", budget: 11000, lifestyle: ["Night Owl", "Non-Smoker", "Vegetarian", "Pet Friendly"], compatibility: 76 },
  ];
  return all.filter((r) => {
    if (city && !r.city.toLowerCase().includes(city.toLowerCase())) return false;
    if (budgetMax && r.budget > Number(budgetMax)) return false;
    if (lifestyleFilter && !r.lifestyle.some((l) => l.toLowerCase().includes(lifestyleFilter.toLowerCase()))) return false;
    return true;
  });
}
