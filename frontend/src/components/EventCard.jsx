import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
export default function EventCard({ event }) {
  const { user } = useAuth();
  const API_BASE_URL = "http://localhost:5000";
  const handleRSVP = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Ensure token is included
      if (!token) {
        toast("You must be logged in to RSVP!");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/events/${event._id}/rsvp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Send token for authentication
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("RSVP successful!");
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("RSVP Error:", error);
      alert("Something went wrong.");
    }
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
          👥 {event.attendees ? event.attendees.length : 0} attendees
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
