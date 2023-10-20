const jwt = require("jsonwebtoken");
const Event = require("../Models/eventModel");
const { v4: uuidv4 } = require("uuid");

const getEvent = async (req, res) => {
  const eventId = req.params.event_id;

  try {
    // Find the event by its event_id
    const event = await Event.findOne({ event_id: eventId });

    if (!event) {
      return res.status(404).json({success: false,  message: "Event not found" });
    }

    return res.status.json({success:true, event});
  } catch (error) {
    console.error("Error retrieving event:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const createEvent = async (req, res) => {
  console.log("creating new Event", req.body);
  //validate request
  if (!req.body) {
    res.status(400).json({
      success : false, 
      message: "content can not be empty",
    });
    return;
  }
  // Generate a UUID for the calendar ID
  const eventId = uuidv4();
  //create a new event
  const event = new Event({
    event_id: eventId,
    calendar_id: req.body.calendar_id,
    username: req.body.username,
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    recurring: req.body.recurring,
    // notification: req.body.notification,
    // image: req.body.image,
    // icon:req.body.icon,
    // Synchronize: req.body.Synchronize,
    time_zone: req.body.time_zone,
    startTime: req.body.startTime,
    finishTime: req.body.finishTime,
    color: req.body.color,
  });
  await event.save();
  res.status(200).send({ success: true, event });
};

// Update an event by event ID
const updateEvent = async (req, res) => {
  try {
    const { event_id } = req.params;
    const updatedEventData = req.body;

    // Find the event by event_id and update it
    const updatedEvent = await Event.findOneAndUpdate(
      { event_id },
      updatedEventData,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({success: true, updatedEvent});
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ success: false , message: "Internal Server Error" });
  }
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.event_id;
  // console.log(eventId);
  try {
    // Find and delete the event by its event
    const deletedEvent = await Event.findOneAndDelete({ event_id: eventId });
    console.log(deletedEvent);
    if (!deletedEvent) {
      return res.status(404).json({success:false,  message: "event not found" });
    }

    return res.status(200).json({success:true,  message: "event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ success:false, message: "Internal Server Error" });
  }
};

//find all the events in a certain day when the date is given

const getEventsByDate = async (req, res) => {
  const checkDate = req.params.checkDate;

  try {
    const dates = await Event.find({ date: checkDate });
    const titles = dates.map((doc) => doc.title);
    if (!titles) {
      return res.status(404).json({ message: "no events not found" });
    }
    return res.json(titles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllEventsForUser = async (req, res) => {
  const { username } = req.params; //pass the username as a parameter

  try {
    const events = await Event.find({ username: username });
    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    } else {
      return res.status(200).json({ success: true, events });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getEventsForUserByDate = async (req, res) => {
  const { username, date } = req.params; // Assuming you pass both username and date as parameters in the URL

  if (!req.body) {
    res.status(400).json({
      message: "content can not be empty",
    });
    return;
  }
  try {
    const events = await Event.find({ username, date });
    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    } else {
      res.status(200).json({ success: true, events });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getEventsByCalendarIds = async (req, res) => {
  try {
    const { calendarIds } = req.query; // Extract calendarIds from query parameters

    if (!calendarIds) {
      return res
        .status(400)
        .json({ success: false, message: "Missing calendarIds parameter" });
    }

    // Split the comma-separated calendarIds string into an array
    const calendarIdArray = calendarIds.split(',');

    // Use the Event model to find events with matching calendar IDs
    const events = await Event.find({ calendar_id: { $in: calendarIdArray } });

    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    } else {
      res.status(200).json({ success: true, events });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};



module.exports = {
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
  getEventsByDate,
  getAllEventsForUser,
  getEventsForUserByDate,
  getEventsByCalendarIds,
};
