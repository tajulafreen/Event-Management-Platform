import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function CreateEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("Music");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login first!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", categories); // ✅ Ensure category is included
    formData.append("date", date);
    formData.append("location", location);
    if (image) formData.append("image", image);

    try {
      await axios.post(`${API_BASE_URL}/api/events`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Event created!");
      navigate("/");
    } catch (err) {
      console.error("Create Event Error:", err.response?.data || err.message);
      toast.error(
        `Failed to create event! ${err.response?.data?.message || ""}`
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Event Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              value={categories}
              onChange={(e) =>
                setCategories(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1).toLowerCase()
                )
              }
              className="w-full p-2 border rounded"
            >
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
              <option value="Tech">Tech</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Date</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Event Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
