import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyDetails from "./pages/PropertyDetails";
import Wishlist from "./pages/Wishlist";
import History from "./pages/History";
import Bookings from "./pages/Bookings";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Roommates from "./pages/Roommates";
import RoommateProfile from "./pages/RoommateProfile";

function Private({ children, roles }) {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <svg
            className="animate-spin w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
            />
          </svg>
          Loading…
        </div>
      </div>
    );
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/roommates" element={<Roommates />} />
          <Route
            path="/roommate-profile"
            element={
              <Private>
                <RoommateProfile />
              </Private>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Private>
                <Wishlist />
              </Private>
            }
          />
          <Route
            path="/history"
            element={
              <Private>
                <History />
              </Private>
            }
          />
          <Route
            path="/bookings"
            element={
              <Private>
                <Bookings />
              </Private>
            }
          />
          <Route
            path="/owner"
            element={
              <Private roles={["owner"]}>
                <OwnerDashboard />
              </Private>
            }
          />
          <Route
            path="/admin"
            element={
              <Private roles={["admin"]}>
                <AdminDashboard />
              </Private>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
