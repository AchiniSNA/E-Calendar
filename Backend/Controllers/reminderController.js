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
        time: req.body.time
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

module.exports = {
    createReminder,
    deleteReminder,
    getReminder,
    editReminder,
}