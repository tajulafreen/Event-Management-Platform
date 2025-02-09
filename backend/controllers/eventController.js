const Event = require("../models/Event");
const { cloudinary } = require("../config/cloudinary");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, category, date, location } = req.body;
    let imageUrl = "";

    // ✅ Convert category to Title Case (First letter uppercase)
    const formattedCategory =
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    console.log("Formatted Category:", formattedCategory);

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "event_images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const event = new Event({
      name,
      description,
      date,
      category: formattedCategory, // ✅ Use formatted category
      location,
      image: imageUrl,
      createdBy: req.user._id,
    });

    await event.save();
    console.log("✅ Event saved:", event);
    res.status(201).json(event);
  } catch (err) {
    console.error("❌ Error creating event:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Events
exports.getAllEvents = async (req, res) => {
  try {
    console.log("Received Filter Params:", req.query); // ✅ Debugging Log

    const { category, date, timeframe } = req.query;
    const filter = {};

    // ✅ Category filter
    if (category && category !== "all") {
      filter.category = category;
    }

    // Date filter
    if (date) {
      const selectedDate = new Date(date);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);

      filter.date = {
        $gte: selectedDate,
        $lt: nextDay,
      };
    }

    // ✅ Timeframe filter (upcoming/past)
    if (timeframe === "upcoming") {
      filter.date = { $gte: new Date() };
    } else if (timeframe === "past") {
      filter.date = { $lt: new Date() };
    }

    console.log("Applied Filters:", filter); // ✅ Debugging Log

    const events = await Event.find(filter)
      .populate("createdBy", "username")
      .sort({ date: 1 });
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
