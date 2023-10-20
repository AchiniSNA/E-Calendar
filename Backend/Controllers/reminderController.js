const Reminder = require ('../Models/reminderModel');
const { v4: uuidv4 } = require('uuid');


const createReminder = async(req,res)=>{
    console.log("creating new Event",req.body);
    //validate request
    if(!req.body){
        res.status(400).json({
        message: "content can not be empty"
        });
    }
    const reminderId = uuidv4();
    //create a new event
    const reminder =new Reminder({
        reminder_id: reminderId,
        calendar_id: req.body.calendar_id,
        title: req.body.title,
        date:req.body.date,
        description:req.body.description ,
        recurring: req.body.recurring,
        time_zone: req.body.time_zone,
        time: req.body.time,
        username: req.body.username,
    });
    await reminder.save();
    res.send(reminder);
}

// Edit an existing reminder by reminder_id
const editReminder = async (req, res) => {
  try {
    const { reminder_id } = req.params;
    const updatedReminderData = req.body;

    // Find the reminder by reminder_id and update it
    const updatedReminder = await Reminder.findOneAndUpdate(
      { reminder_id },
      updatedReminderData,
      { new: true }
    );

    if (!updatedReminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    res.status(200).json(updatedReminder);
  } catch (error) {
    console.error('Error editing reminder:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getReminder= async(req,res)=> {
  const reminderId = req.params.reminder_id;

  try {
    // Find the reminder by its reminder_id
    const reminder = await Reminder.findOne({ reminder_id: reminderId });

    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    return res.json(reminder);
  } catch (error) {
    console.error('Error retrieving reminder:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const deleteReminder = async(req,res)=>{
    const reminderId = req.params.reminder_id; 
    try {
      // Find and delete the reminder by its reminder_id
      const deletedReminder = await Reminder.findOneAndDelete({ reminder_id: reminderId });
      if (!deleteReminder) {
        return res.status(404).json({ message: 'Reminder not found' });
      }
  
      return res.json({ message: 'Reminder deleted successfully' });
    } catch (error) {
      console.error('Error deleting reminder:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }



//find all the reminders in a certain day when the date is given

const getRemindersByDate= async (req, res) => {
  const { date } = req.params;

  // Assuming date is in format 'YYYY-MM-DD'
  const startDate = new Date(date);
  const endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 1));

  try {
    const events = await Reminder.find(
      {
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      },
      { title: 1, _id: 0 } // Project only the 'title' field, exclude '_id'
    );

    const reminderTitles = events.map((reminder) => reminder.title);
   


    res.json(reminderTitles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  

const getAllRemindersForUser = async (req, res) => {
  const {username} = req.params; //pass the username as a parameter

  try{
    const reminders= await Reminder.find({username: username});
    if (!reminders || reminders.length === 0) {
      return res.status(404).json({success:false, message: 'Reminder not found' });
    }
    else{
    return res.status(200).json({success:true,reminders});
    }
  }catch(error){
    res.status(500).json({success: false, error:'Internal Server Error'});
  } 
}

module.exports = {
    createReminder,
    deleteReminder,
    getReminder,
    editReminder,
    getRemindersByDate,
    getAllRemindersForUser
}
