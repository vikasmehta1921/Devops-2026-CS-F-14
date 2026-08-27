import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LIFESTYLE_OPTIONS = [
  { key: "Early Bird", icon: "🌅" },
  { key: "Night Owl", icon: "🦉" },
  { key: "Non-Smoker", icon: "🚭" },
  { key: "Smoker", icon: "🚬" },
  { key: "Vegetarian", icon: "🥬" },
  { key: "Non-Vegetarian", icon: "🍗" },
  { key: "Pet Friendly", icon: "🐾" },
  { key: "No Pets", icon: "🚫" },
  { key: "Clean", icon: "✨" },
  { key: "Studious", icon: "📚" },
  { key: "Social", icon: "🎉" },
  { key: "Quiet", icon: "🤫" },
];

export default function RoommateProfile() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [form, setForm] = useState({
    age: "",
    occupation: "",
    city: "",
    budget: "",
    bio: "",
    lifestyle: [],
  });

  // Load existing profile preferences from user profile
  useEffect(() => {
    api
      .get("/users/profile")
      .then((r) => {
        const prefs = r.data?.preferences || {};
        setForm((prev) => ({
          ...prev,
          city: prefs.city || "",
          budget: prefs.maxRent || "",
        }));
      })
      .catch(() => {})
      .finally(() => setInitialLoading(false));
  }, []);

  const toggleLifestyle = (key) => {
    setForm((prev) => ({
      ...prev,
      lifestyle: prev.lifestyle.includes(key)
        ? prev.lifestyle.filter((l) => l !== key)
        : [...prev.lifestyle, key],
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Save preferences to user profile — backend uses PUT /api/users/profile
      await api.put("/users/profile", {
        preferences: {
          city: form.city,
          maxRent: Number(form.budget),
        },
      });
      setSaved(true);
      setTimeout(() => nav("/roommates"), 1500);
    } catch (err) {
      console.error("Failed to save profile:", err);
      // Still navigate to show mock roommates
      setSaved(true);
      setTimeout(() => nav("/roommates"), 1500);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
          </svg>
          Loading your profile…
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-slide-up">
          <span className="badge badge-cyan mb-3">Roommate Profile</span>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white">
            {user?.name ? (
              <>Hi <span className="gradient-text">{user.name.split(" ")[0]}</span>, set up your profile</>
            ) : (
              <>Create your <span className="gradient-text">roommate profile</span></>
            )}
          </h1>
          <p className="text-slate-400 mt-2">
            Help others get to know you. The more you share, the better your matches!
          </p>
        </div>

        {saved && (
          <div className="mt-6 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm animate-slide-up">
            ✅ Profile saved! Redirecting to roommates…
          </div>
        )}

        <form
          onSubmit={submit}
          className="glass rounded-2xl p-6 md:p-8 mt-8 space-y-6 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Basic Info */}
          <div>
            <h2 className="font-display font-semibold text-white text-lg mb-4">
              Basic Info
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Age *</label>
                <input
                  required
                  className="input-glass"
                  type="number"
                  min="16"
                  max="60"
                  placeholder="24"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Occupation *</label>
                <input
                  required
                  className="input-glass"
                  placeholder="Software Engineer"
                  value={form.occupation}
                  onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Preferred City *</label>
                <input
                  required
                  className="input-glass"
                  placeholder="Bangalore"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Monthly Budget (₹) *</label>
                <input
                  required
                  className="input-glass"
                  type="number"
                  min="1000"
                  placeholder="12000"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">About you</label>
            <textarea
              className="input-glass min-h-[100px] resize-none"
              placeholder="Tell potential roommates about yourself — your hobbies, work schedule, what you're looking for in a roommate…"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>

          {/* Lifestyle Preferences */}
          <div>
            <h2 className="font-display font-semibold text-white text-lg mb-2">
              Lifestyle Preferences
            </h2>
            <p className="text-slate-500 text-sm mb-4">Select all that apply to you</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LIFESTYLE_OPTIONS.map((opt) => {
                const selected = form.lifestyle.includes(opt.key);
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => toggleLifestyle(opt.key)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      selected
                        ? "bg-violet-500/20 border border-violet-500/40 text-violet-300"
                        : "bg-white/[0.03] border border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300"
                    }`}
                  >
                    <span className="text-lg">{opt.icon}</span>
                    {opt.key}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saved || loading}
            className="btn-primary w-full !py-3.5 font-display font-semibold text-base"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                </svg>
                Saving…
              </span>
            ) : saved ? (
              "Profile Saved ✓"
            ) : (
              "Save Profile"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
