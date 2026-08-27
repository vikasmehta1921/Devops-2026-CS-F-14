import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function OwnerDashboard() {
  const [d, setD] = useState([]);

  const [f, setF] = useState({
    title: "",
    description: "",
    propertyType: "pg",
    furnishing: "furnished",
    roomType: "single",
    rent: "",
    deposit: "",
    bedrooms: 1,
    bathrooms: 1,
    city: "",
    state: "Rajasthan",
    locality: "",
    pincode: "",
    address: "",
    amenities: "",
  });

  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    try {
      const r = await api.get("/properties/mine");
      setD(r.data);
    } catch (error) {
      console.error("Failed to load properties:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();

    try {
      const propertyData = {
        title: f.title,
        description: f.description,
        propertyType: f.propertyType,
        furnishing: f.furnishing,
        roomType: f.roomType,
        rent: Number(f.rent),
        deposit: Number(f.deposit || 0),
        bedrooms: Number(f.bedrooms || 1),
        bathrooms: Number(f.bathrooms || 1),
        city: f.city,
        state: f.state,
        locality: f.locality,
        pincode: f.pincode,
        address: f.address,
        amenities: f.amenities
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      };

      await api.post("/properties", propertyData);
      alert("Property added successfully!");

      setF({
        title: "",
        description: "",
        propertyType: "pg",
        furnishing: "furnished",
        roomType: "single",
        rent: "",
        deposit: "",
        bedrooms: 1,
        bathrooms: 1,
        city: "",
        state: "Rajasthan",
        locality: "",
        pincode: "",
        address: "",
        amenities: "",
      });

      setShowForm(false);
      load();
    } catch (error) {
      console.error("Property creation failed:", error);
      console.error("Backend response:", error.response?.data);
      alert(
        error.response?.data?.message ||
          "Failed to add property. Check the browser console."
      );
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-slide-up">
          <div>
            <span className="badge badge-violet mb-3">Owner</span>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white">
              Dashboard
            </h1>
            <p className="text-slate-400 mt-2">
              Manage your property listings
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={showForm ? "btn-secondary" : "btn-primary"}
          >
            {showForm ? "Cancel" : "+ Add Property"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          {[
            { label: "Total Listings", value: d.length, icon: "🏠" },
            {
              label: "Verified",
              value: d.filter((p) => p.verified).length,
              icon: "✅",
            },
            {
              label: "Pending",
              value: d.filter((p) => !p.verified).length,
              icon: "⏳",
            },
            {
              label: "Avg Rent",
              value: d.length
                ? `₹${Math.round(d.reduce((s, p) => s + p.rent, 0) / d.length).toLocaleString()}`
                : "—",
              icon: "💰",
            },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <p className="text-2xl font-display font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Property Form */}
        {showForm && (
          <form
            onSubmit={create}
            className="glass rounded-2xl p-6 mt-8 animate-slide-down"
          >
            <h2 className="font-display font-bold text-xl text-white mb-6">
              Add New Property
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Property Title *
                </label>
                <input
                  required
                  className="input-glass"
                  placeholder="Spacious 2BHK in Mansarovar"
                  value={f.title}
                  onChange={(e) => setF({ ...f, title: e.target.value })}
                />
              </div>

              {/* City */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  City *
                </label>
                <input
                  required
                  className="input-glass"
                  placeholder="Jaipur"
                  value={f.city}
                  onChange={(e) => setF({ ...f, city: e.target.value })}
                />
              </div>

              {/* State */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  State *
                </label>
                <input
                  required
                  className="input-glass"
                  placeholder="Rajasthan"
                  value={f.state}
                  onChange={(e) => setF({ ...f, state: e.target.value })}
                />
              </div>

              {/* Locality */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Locality
                </label>
                <input
                  className="input-glass"
                  placeholder="Mansarovar"
                  value={f.locality}
                  onChange={(e) => setF({ ...f, locality: e.target.value })}
                />
              </div>

              {/* Pincode */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Pincode
                </label>
                <input
                  className="input-glass"
                  placeholder="302020"
                  value={f.pincode}
                  onChange={(e) => setF({ ...f, pincode: e.target.value })}
                />
              </div>

              {/* Rent */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Rent (₹/month) *
                </label>
                <input
                  required
                  className="input-glass"
                  placeholder="8000"
                  type="number"
                  min="0"
                  value={f.rent}
                  onChange={(e) => setF({ ...f, rent: e.target.value })}
                />
              </div>

              {/* Deposit */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Deposit (₹)
                </label>
                <input
                  className="input-glass"
                  placeholder="16000"
                  type="number"
                  min="0"
                  value={f.deposit}
                  onChange={(e) => setF({ ...f, deposit: e.target.value })}
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Property Type
                </label>
                <select
                  className="select-glass"
                  value={f.propertyType}
                  onChange={(e) =>
                    setF({ ...f, propertyType: e.target.value })
                  }
                >
                  <option value="flat">Flat</option>
                  <option value="apartment">Apartment</option>
                  <option value="pg">PG</option>
                  <option value="hostel">Hostel</option>
                  <option value="room">Room</option>
                  <option value="house">House</option>
                </select>
              </div>

              {/* Furnishing */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Furnishing
                </label>
                <select
                  className="select-glass"
                  value={f.furnishing}
                  onChange={(e) => setF({ ...f, furnishing: e.target.value })}
                >
                  <option value="furnished">Furnished</option>
                  <option value="semi-furnished">Semi Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Bedrooms
                </label>
                <input
                  className="input-glass"
                  type="number"
                  min="1"
                  value={f.bedrooms}
                  onChange={(e) => setF({ ...f, bedrooms: e.target.value })}
                />
              </div>

              {/* Bathrooms */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Bathrooms
                </label>
                <input
                  className="input-glass"
                  type="number"
                  min="1"
                  value={f.bathrooms}
                  onChange={(e) => setF({ ...f, bathrooms: e.target.value })}
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Full Address
                </label>
                <input
                  className="input-glass"
                  placeholder="House No. 123, Street Name, Area"
                  value={f.address}
                  onChange={(e) => setF({ ...f, address: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Description *
                </label>
                <textarea
                  required
                  className="input-glass min-h-[100px] resize-none"
                  placeholder="Describe your property in detail…"
                  value={f.description}
                  onChange={(e) =>
                    setF({ ...f, description: e.target.value })
                  }
                />
              </div>

              {/* Amenities */}
              <div className="md:col-span-2">
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Amenities (comma separated)
                </label>
                <input
                  className="input-glass"
                  placeholder="WiFi, AC, Parking, Gym, Laundry"
                  value={f.amenities}
                  onChange={(e) => setF({ ...f, amenities: e.target.value })}
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="btn-primary w-full !py-3.5 font-display font-semibold"
                >
                  Add Property
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Existing Properties */}
        <h2 className="font-display font-bold text-xl text-white mt-10 mb-5">
          Your Properties ({d.length})
        </h2>

        {d.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-5xl mb-4">🏗️</div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              No properties listed yet
            </h3>
            <p className="text-slate-400">
              Click &quot;Add Property&quot; to create your first listing.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {d.map((p, i) => (
              <div
                className="glass-card rounded-2xl p-5 animate-slide-up"
                style={{ animationDelay: `${i * 0.05}s` }}
                key={p._id}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-bold text-white text-lg leading-tight">
                    {p.title}
                  </h3>
                  <span
                    className={`badge flex-shrink-0 ml-2 ${
                      p.verified ? "badge-green" : "badge-amber"
                    }`}
                  >
                    {p.verified ? "Verified" : "Pending"}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">
                  {p.city} · ₹{p.rent?.toLocaleString()}/mo
                </p>
                <Link
                  className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 mt-3 transition-colors"
                  to={`/properties/${p._id}`}
                >
                  View details
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}