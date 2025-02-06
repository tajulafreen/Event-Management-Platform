const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  createEvent,
  getAllEvents,
  rsvpToEvent,
} = require("../controllers/eventController");
const upload = require("../config/cloudinary"); // ✅ Now points directly to the multer instance

// Routes
router.post("/", authenticate, upload.single("image"), createEvent);
router.get("/", getAllEvents);
router.post("/:id/rsvp", authenticate, rsvpToEvent);

module.exports = router;
