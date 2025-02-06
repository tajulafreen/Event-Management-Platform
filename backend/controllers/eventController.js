const Event = require("../models/Event");
const cloudinary = require("../config/cloudinary");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, location } = req.body;
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`,
        { folder: "event_images" }
      );
      imageUrl = result.secure_url;
    }

    const event = new Event({
      name,
      description,
      date,
      location,
      image: imageUrl,
      createdBy: req.user._id,
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "username");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// RSVP to Event
exports.rsvpToEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.attendees.includes(req.user._id)) {
      return res.status(400).json({ message: "Already RSVPed" });
    }

    event.attendees.push(req.user._id);
    await event.save();

    // Emit real-time update via Socket.IO
    req.io.emit("attendeeUpdate", {
      eventId: event._id,
      attendees: event.attendees,
    });
    res.json({ message: "RSVP successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
