import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Event Platform</Link>
        <div className="space-x-4">
          {user ? (
            <button onClick={logout} className="text-white">Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
          <Link to="/create-event" className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Event
          </Link>
        </div>
      </div>
    </nav>
  );
}