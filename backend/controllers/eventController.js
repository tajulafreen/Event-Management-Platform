const Event = require("../models/Event");
const { cloudinary } = require("../config/cloudinary");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, location } = req.body;
    let imageUrl = "";

    console.log("Uploaded file:", req.file); // ✅ Debugging Log

    if (req.file) {
      // ✅ Fix: Upload buffer instead of file path
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "event_images" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary Upload Error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(req.file.buffer); // ✅ Send buffer to Cloudinary
      });

      imageUrl = result.secure_url; // ✅ Cloudinary Image URL
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
    console.log("Event saved:", event);
    res.status(201).json(event);
  } catch (err) {
    console.error("Error creating event:", err);
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
    console.log("Received RSVP Request:", req.params.id);
    console.log("Authenticated User:", req.user);

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: No user data" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.attendees.includes(req.user._id)) {
      return res.status(400).json({ message: "Already RSVPed" });
    }

    event.attendees.push(req.user._id);
    await event.save();

    console.log("RSVP successful, emitting event...");
    const updatedEvent = await Event.findById(event._id).populate(
      "attendees",
      "username"
    );
    // ✅ Emit WebSocket event after RSVP is successful
    req.io.emit("attendeeUpdate", {
      eventId: event._id,
      attendees: event.attendees,
    });

    res.json({ message: "RSVP successful" });
  } catch (err) {
    console.error("Error in RSVP route:", err);
    res.status(500).json({ message: "Server error" });
  }
};
