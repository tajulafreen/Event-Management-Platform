import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function EventCard({ event, user }) {
  const API_BASE_URL = "https://event-management-platform-m3c3.onrender.com";
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to delete an event!");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/events/${event._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Event deleted successfully!");
        window.location.reload();
      } else {
        const data = await response.json();
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete event.");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-event/${event._id}`);
  };

  const handleRSVP = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast("You must be logged in to RSVP!");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/events/${event._id}/rsvp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      toast.error("Something went wrong.");
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
      <div className="flex justify-between items-start mb-4">
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
          {event.category}
        </span>
        <span className="text-sm text-gray-500">
          {new Date(event.date).toLocaleDateString()}
        </span>
      </div>
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
        {user && String(event.createdBy?._id) === String(user._id) && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
