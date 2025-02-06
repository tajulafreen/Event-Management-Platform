const axios = require("axios");

async function testBackend() {
  try {
    // Register
    await axios.post("http://localhost:5000/api/auth/register", {
      username: "testuser",
      email: "test@exampleg.com",
      password: "test123",
    });

    // Login
    const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
      email: "test@exampleg.com",
      password: "test123",
    });
    const token = loginRes.data.token;

    // Create Event
    const eventRes = await axios.post(
      "http://localhost:5000/api/events",
      {
        name: "Test Event",
        description: "Test1",
        date: "2025-12-31T18:00:00Z",
        location: "Online",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Event created:", eventRes.data);

    // Fetch Events
    const eventsRes = await axios.get("http://localhost:5000/api/events");
    console.log("Events:", eventsRes.data);
  } catch (err) {
    console.error("Test failed:", err.response?.data || err.message);
  }
}

testBackend();
