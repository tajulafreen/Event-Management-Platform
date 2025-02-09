const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  createEvent,
  checkEventOwnership,
  updateEvent,
  deleteEvent,
  getAllEvents,
  rsvpToEvent,
} = require("../controllers/eventController");
const { upload } = require("../config/cloudinary"); // ✅ Ensure this is correct

// Routes
router.post("/", authenticate, upload.single("image"), createEvent);
router.put("/:id", authenticate, checkEventOwnership, updateEvent);
router.delete("/:id", authenticate, checkEventOwnership, deleteEvent);
router.get("/my-events", authenticate, getAllEvents);
router.get("/", getAllEvents);
router.post("/:id/rsvp", authenticate, rsvpToEvent);

module.exports = router;
