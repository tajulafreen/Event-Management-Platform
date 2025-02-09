import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext"; // ✅ Use event context
export default function Dashboard() {
  const { user } = useAuth(); // ✅ Get logged-in user

  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    date: "",
    timeframe: "all",
  });

  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const socket = io(API_BASE_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    const fetchEvents = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.category !== "all")
          params.append("category", filters.category);
        if (filters.date) params.append("date", filters.date);
        if (filters.timeframe !== "all")
          params.append("timeframe", filters.timeframe);

        console.log("Fetching events with filters:", params.toString());
        const res = await axios.get(
          `${API_BASE_URL}/api/events?${params.toString()}`
        );
        setEvents(res.data);
      } catch (error) {
        console.error(
          "Error fetching events:",
          error.response?.data || error.message
        );
      }
    };
    fetchEvents();

    socket.on("attendeeUpdate", (data) => {
      console.log("📡 Received WebSocket Update:", data);
      setEvents((prev) =>
        prev.map((event) =>
          event._id === data.eventId
            ? { ...event, attendees: data.attendees }
            : event
        )
      );
    });

    return () => socket.disconnect();
  }, [filters, setEvents, user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

      {/* 🔹 Filters Section */}
      <div className="filter-section mb-8 p-4 bg-gray-50 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="p-2 border rounded"
          >
            <option value="all">All Categories</option>
            {["Music", "Sports", "Tech", "Business", "Education", "Other"].map(
              (opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              )
            )}
          </select>

          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="p-2 border rounded"
          />

          <select
            value={filters.timeframe}
            onChange={(e) =>
              setFilters({ ...filters, timeframe: e.target.value })
            }
            className="p-2 border rounded"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming Events</option>
            <option value="past">Past Events</option>
          </select>
        </div>
      </div>

      {/* 🔹 Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event._id} event={event} user={user} />
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">No events found</p>
        )}
      </div>
    </div>
  );
}
