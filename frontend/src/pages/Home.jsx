import { useEffect, useState } from "react";
import api from "../services/api";
import PropertyCard from "../components/PropertyCard";
import FeatureCard from "../components/FeatureCard";
import SkeletonCard from "../components/SkeletonCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("properties");
  const nav = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get("/properties?limit=8")
      .then((r) => setData(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const search = (e) => {
    e.preventDefault();
    if (activeTab === "roommates") {
      nav(`/roommates?city=${encodeURIComponent(city)}`);
    } else {
      nav(`/search?city=${encodeURIComponent(city)}`);
    }
  };

  const features = [
    {
      icon: "🔍",
      title: "Smart Search",
      description:
        "Advanced filters for city, budget, furnishing, and property type to find your perfect match.",
    },
    {
      icon: "🤝",
      title: "Roommate Matching",
      description:
        "Find compatible roommates based on lifestyle, budget, and preferences with our smart algorithm.",
    },
    {
      icon: "🔒",
      title: "Secure Booking",
      description:
        "Book properties securely. Owner contacts are shared only after confirmed booking.",
    },
    {
      icon: "⭐",
      title: "Verified Listings",
      description:
        "All properties are admin-verified ensuring authentic listings and safe transactions.",
    },
    {
      icon: "💬",
      title: "Direct Enquiry",
      description:
        "Send enquiries directly to property owners and get quick responses on availability.",
    },
    {
      icon: "📍",
      title: "Pan-India Coverage",
      description:
        "Explore PGs, flats, apartments, rooms, and hostels in cities across India.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Properties" },
    { value: "5K+", label: "Roommates" },
    { value: "50+", label: "Cities" },
    { value: "98%", label: "Happy Users" },
  ];

  return (
    <main>
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated background shapes */}
        <div className="floating-shape w-96 h-96 bg-violet-600 top-10 -left-48 animate-float" />
        <div className="floating-shape w-80 h-80 bg-cyan-500 top-1/3 right-0 animate-float-delayed" />
        <div className="floating-shape w-64 h-64 bg-violet-500 bottom-20 left-1/3 animate-float-slow" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="max-w-4xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-violet-300 mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Smart Rental & Roommate Finder
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-7xl leading-[1.1] animate-slide-up">
              Find your perfect{" "}
              <span className="gradient-text">rental</span> or ideal{" "}
              <span className="gradient-text">roommate</span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl mt-6 max-w-2xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Search smarter. Save favourites. Book securely. Connect with
              verified owners and compatible roommates across India.
            </p>

            {/* Search Box */}
            <div className="mt-10 max-w-2xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
              {/* Tabs */}
              <div className="flex gap-1 mb-3">
                {[
                  { key: "properties", label: "🏠 Properties" },
                  { key: "roommates", label: "👥 Roommates" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.key
                        ? "bg-white/10 text-white border border-white/10"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <form
                onSubmit={search}
                className="glass rounded-2xl p-2 flex flex-col sm:flex-row gap-2"
              >
                <div className="relative flex-1">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
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
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent text-white pl-12 pr-4 py-4 outline-none placeholder:text-slate-500"
                    placeholder={
                      activeTab === "properties"
                        ? "Search city, locality or PIN code…"
                        : "Search city for roommates…"
                    }
                  />
                </div>
                <button className="btn-primary !py-4 !px-8 !rounded-xl font-display font-semibold">
                  Search
                </button>
              </form>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-2 mt-5 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              {["Jaipur", "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad"].map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCity(c);
                      nav(`/search?city=${c}`);
                    }}
                    className="px-4 py-1.5 rounded-full text-sm text-slate-400 border border-white/10 hover:border-violet-500/30 hover:text-violet-400 hover:bg-violet-500/5 transition-all"
                  >
                    {c}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display font-black text-3xl md:text-4xl gradient-text">
                  {s.value}
                </p>
                <p className="text-slate-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="badge badge-violet mb-4">Why NestMate</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3">
            Everything you need,{" "}
            <span className="gradient-text">one platform</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Whether you&apos;re looking for a rental or a roommate, we&apos;ve got the
            smartest tools to help you find the perfect match.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* ─── Latest Properties ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="badge badge-cyan mb-3">Latest Listings</span>
            <h2 className="font-display font-bold text-3xl text-white mt-2">
              Fresh properties
            </h2>
          </div>
          <button
            onClick={() => nav("/search")}
            className="btn-secondary text-sm hidden sm:inline-flex"
          >
            View all →
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : data.map((p) => <PropertyCard key={p._id} p={p} />)}
        </div>
        {!loading && data.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No properties found yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* ─── Roommate CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="floating-shape w-64 h-64 bg-cyan-500 -top-32 -right-32 opacity-20" />
          <div className="floating-shape w-48 h-48 bg-violet-500 -bottom-24 -left-24 opacity-20" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="badge badge-cyan mb-4">New Feature</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2">
                Find your ideal{" "}
                <span className="gradient-text">roommate</span>
              </h2>
              <p className="text-slate-400 mt-4">
                Create your profile, set your preferences, and our smart
                algorithm will match you with compatible roommates in your
                preferred city and budget range.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => nav("/roommates")}
                  className="btn-primary"
                >
                  Browse Roommates
                </button>
                <button
                  onClick={() => nav("/roommate-profile")}
                  className="btn-secondary"
                >
                  Create Profile
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: "🌅", label: "Early Bird" },
                  { emoji: "🚭", label: "Non-Smoker" },
                  { emoji: "🥬", label: "Vegetarian" },
                  { emoji: "✨", label: "Clean" },
                  { emoji: "📚", label: "Studious" },
                  { emoji: "🐾", label: "Pet Friendly" },
                ].map((tag, i) => (
                  <div
                    key={tag.label}
                    className="glass rounded-xl px-4 py-3 text-center animate-float"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    <span className="text-2xl block">{tag.emoji}</span>
                    <span className="text-xs text-slate-400 mt-1 block">
                      {tag.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
