const Calendar=require('../Models/calendarModel');
const { v4: uuidv4 } = require('uuid');


const createCalendar = async(req,res)=>{
    console.log("creating new calendar",req.body);
    //validate request
    if(!req.body){
        res.status(400).json({
            message: "content can not be empty"
        });
    }
    const calendaId = uuidv4();
    //create a new event
    const calendar =new Calendar({
        calendar_id: calendaId,
        username: req.body.username,
        account_number:req.body.account_number,
        access:req.body.access ,
        name: req.body.name,
    });
    await calendar.save();
    res.send(calendar);
}

const getCalendar = async(req,res)=> {
  const calendarId = req.params.calendar_id;

  try {
    // Find the calendar by its calendar_id
    const calendar = await Calendar.findOne({ calendar_id: calendarId });

    if (!calendar) {
      return res.status(404).json({ message: 'Calendar not found' });
    }

    return res.json(calendar);
  } catch (error) {
    console.error('Error retrieving calendar:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const deleteCalendar = async(req,res)=>{
    const calendarId = req.params.calendar_id; 
    try {
      // Find and delete the appointment by its appointment_id
      const deletedCalendar = await Calendar.findOneAndDelete({ calendar_id: calendarId });
      if (!deletedCalendar) {
        return res.status(404).json({ message: 'calendar not found' });
      }
  
      return res.json({ message: 'Calandar deleted successfully' });
    } catch (error) {
      console.error('Error deleting Calandar:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  const getUserCalendars = async (req, res) => {
    const username = req.params.username;
  
    try {
      // Find all calendars associated with the given username
      const calendars = await Calendar.find({ username }, 'calendar_id');
  
      if (!calendars || calendars.length === 0) {
        return res.status(404).json({ message: 'No calendars found for this user' });
      }
  
      // Extract calendar IDs and send them in the response
      const calendarIds = calendars.map((calendar) => calendar.calendar_id);
      res.status(200).json({ calendarIds });
    } catch (error) {
      console.error('Error retrieving user calendars:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports={
    createCalendar,
    deleteCalendar,
    getCalendar,
    getUserCalendars,
}