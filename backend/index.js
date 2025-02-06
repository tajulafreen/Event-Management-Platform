const express = require("express");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Import database config
const { initializeSocket } = require("./config/socket");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB(); // ✅ Replace old connection code with this

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Socket.IO
const io = initializeSocket(server);
app.set("io", io);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
