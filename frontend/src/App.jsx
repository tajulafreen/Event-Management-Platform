import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateEvent from "./components/CreateEvent";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Toaster position="top-right" /> {/* For notifications */}
        <div className="min-h-screen bg-gray-300   p-4">
          <div className="container mx-auto">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Protected Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/create-event" element={<CreateEvent />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}
