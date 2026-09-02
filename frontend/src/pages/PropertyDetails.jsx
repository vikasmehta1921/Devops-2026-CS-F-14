import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    moveInDate: "",
    durationMonths: 1,
    message: "",
  });
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistAnimating, setWishlistAnimating] = useState(false);
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    api.get(`/properties/${id}`).then((r) => setProperty(r.data));
  }, [id]);

  if (!property)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
          </svg>
          Loading property…
        </div>
      </main>
    );

  const book = async (e) => {
    e.preventDefault();
    if (!user) return nav("/login");
    try {
      await api.post("/bookings", { propertyId: id, ...bookingForm });
      setMsgType("success");
      setMsg("🎉 Booking request submitted! Check your bookings page.");
    } catch (err) {
      setMsgType("error");
      setMsg(err.response?.data?.message || "Booking failed. Please try again.");
    }
  };

  const submitEnquiry = async () => {
    if (!enquiryMessage.trim()) return;
    try {
      await api.post("/enquiries", { propertyId: id, message: enquiryMessage });
      setMsgType("success");
      setMsg("✉️ Enquiry sent! The owner will contact you shortly.");
      setShowEnquiryModal(false);
      setEnquiryMessage("");
    } catch (err) {
      setMsgType("error");
      setMsg(err.response?.data?.message || "Failed to send enquiry.");
    }
  };

  const toggleWishlist = async () => {
    if (!user) return nav("/login");
    setWishlistAnimating(true);
    setTimeout(() => setWishlistAnimating(false), 400);
    try {
      if (isWishlisted) {
        await api.delete(`/favorites/${property._id}`);
        setIsWishlisted(false);
      } else {
        await api.post("/favorites", { propertyId: property._id });
        setIsWishlisted(true);
      }
    } catch {
      // Already in wishlist is fine — just toggle UI
      setIsWishlisted(true);
    }
  };

  const img =
    property.images?.[0] ||
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80";

  return (
    <main className="min-h-screen pt-20 pb-16">
      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass rounded-2xl p-6 w-full max-w-md animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-xl text-white">Send Enquiry</h3>
              <button
                onClick={() => setShowEnquiryModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Your message will be sent to the owner of <span className="text-violet-400">{property.title}</span>.
            </p>
            <textarea
              className="input-glass min-h-[120px] resize-none w-full"
              placeholder="Hi, I'm interested in this property. Is it still available? When can I visit?"
              value={enquiryMessage}
              onChange={(e) => setEnquiryMessage(e.target.value)}
              autoFocus
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowEnquiryModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={submitEnquiry}
                disabled={!enquiryMessage.trim()}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Image */}
      <div className="relative h-[350px] md:h-[450px] overflow-hidden">
        <img className="w-full h-full object-cover" src={img} alt={property.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />

        {/* Wishlist button on image */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-6 right-6 w-11 h-11 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-110 ${wishlistAnimating ? "scale-125" : ""}`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <span className={`text-xl ${isWishlisted ? "text-red-400" : "text-white/70"}`}>
            {isWishlisted ? "❤️" : "♡"}
          </span>
        </button>

        <div className="absolute bottom-6 left-0 right-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="badge badge-violet mb-3">{property.propertyType}</span>
          <h1 className="font-display font-black text-3xl md:text-5xl text-white">
            {property.title}
          </h1>
          <p className="text-slate-300 mt-2 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {property.locality}, {property.city}, {property.state}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price & Quick Info */}
            <div className="glass rounded-2xl p-6 animate-slide-up">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-3xl font-display font-black gradient-text">
                    ₹{property.rent?.toLocaleString()}
                  </p>
                  <p className="text-slate-500 text-sm">per month</p>
                </div>
                <div className="flex gap-3">
                  {[
                    { label: "Bedrooms", value: property.bedrooms },
                    { label: "Bathrooms", value: property.bathrooms },
                    {
                      label: "Rating",
                      value: `⭐ ${property.ratingAvg?.toFixed(1) || "New"}`,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="text-center px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <p className="text-white font-bold">{item.value}</p>
                      <p className="text-slate-500 text-xs">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="font-display font-bold text-lg text-white mb-3">
                About this property
              </h2>
              <p className="text-slate-400 leading-relaxed">{property.description}</p>
            </div>

            {/* Details Grid */}
            <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.15s" }}>
              <h2 className="font-display font-bold text-lg text-white mb-4">
                Details
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Furnishing", value: property.furnishing, icon: "🛋️" },
                  { label: "Bedrooms", value: property.bedrooms, icon: "🛏️" },
                  { label: "Bathrooms", value: property.bathrooms, icon: "🚿" },
                  { label: "Deposit", value: `₹${(property.deposit || 0).toLocaleString()}`, icon: "💰" },
                  { label: "Room Type", value: property.roomType || "—", icon: "📐" },
                  { label: "Pincode", value: property.pincode || "—", icon: "📍" },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <span className="text-lg">{d.icon}</span>
                    <div>
                      <p className="text-xs text-slate-500">{d.label}</p>
                      <p className="text-sm text-white font-medium capitalize">{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="font-display font-bold text-lg text-white mb-4">
                  Amenities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((a) => (
                    <span
                      key={a}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/5 text-sm text-slate-300"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Owner Info (non-sensitive) */}
            {property.owner && (
              <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.25s" }}>
                <h2 className="font-display font-bold text-lg text-white mb-3">
                  Listed by
                </h2>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                    {property.owner.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{property.owner.name}</p>
                    <p className="text-slate-500 text-sm">Property Owner</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — Booking */}
          <div className="space-y-5 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {/* Status Message */}
            {msg && (
              <div
                className={`px-4 py-3 rounded-xl text-sm ${
                  msgType === "success"
                    ? "bg-green-500/10 border border-green-500/20 text-green-400"
                    : "bg-red-500/10 border border-red-500/20 text-red-400"
                }`}
              >
                {msg}
              </div>
            )}

            <div className="glass rounded-2xl p-6 sticky top-24">
              <h2 className="font-display font-bold text-lg text-white mb-4">
                Book this property
              </h2>

              {!user ? (
                <div className="text-center py-4">
                  <p className="text-slate-400 text-sm mb-4">
                    Please log in to book or enquire about this property.
                  </p>
                  <Link to="/login" className="btn-primary w-full block text-center">
                    Login to Continue
                  </Link>
                </div>
              ) : (
                <form onSubmit={book} className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">
                      Move-in date
                    </label>
                    <input
                      required
                      type="date"
                      className="input-glass text-sm"
                      min={new Date().toISOString().split("T")[0]}
                      value={bookingForm.moveInDate}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, moveInDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">
                      Duration (months)
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="input-glass text-sm"
                      value={bookingForm.durationMonths}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, durationMonths: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">
                      Message (optional)
                    </label>
                    <textarea
                      className="input-glass text-sm min-h-[80px] resize-none"
                      placeholder="Introduce yourself…"
                      value={bookingForm.message}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, message: e.target.value })
                      }
                    />
                  </div>
                  <button className="btn-primary w-full !py-3 font-display font-semibold">
                    Book Now
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!user) return nav("/login");
                      setShowEnquiryModal(true);
                    }}
                    className="btn-secondary w-full !py-3"
                  >
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
