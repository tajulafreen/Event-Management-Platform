import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function EventCard({ event }) {
  const { user } = useAuth();
  const API_BASE_URL = "http://localhost:5000";
  const handleRSVP = async () => {
    if (!user) return alert("Please login to RSVP");
    await axios.post(
      `${API_BASE_URL}/api/events/${event._id}/rsvp`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <img
        src={event.image || "https://via.placeholder.com/300"}
        alt={event.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h2 className="text-xl font-bold mb-2">{event.name}</h2>
      <p className="text-gray-600 mb-2">{event.description}</p>
      <p className="text-sm text-gray-500 mb-2">
        📅 {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500 mb-4">📍 {event.location}</p>
      <div className="flex justify-between items-center">
        <span className="text-blue-600">
          👥 {event.attendees?.length || 0} attendees
        </span>
        <button
          onClick={handleRSVP}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          RSVP
        </button>
      </div>
    </div>
  );
}
