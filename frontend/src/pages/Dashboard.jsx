import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import { io } from "socket.io-client";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true,

      transports: ["websocket"],
    });
    const fetchEvents = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/events`);
      setEvents(res.data);
    };
    fetchEvents();

    socket.on("attendeeUpdate", (data) => {
      console.log("Received WS update:", data);
      // ... existing update logic ...
      setEvents((prev) =>
        prev.map((event) =>
          event._id === data.eventId
            ? { ...event, attendees: data.attendees }
            : event
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
