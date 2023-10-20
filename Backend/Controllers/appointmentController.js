const Appointment=require('../Models/appointmentModel');
const {v4:uuidv4} = require('uuid')

const createAppointment = async(req,res)=>{
    console.log("creating new Appointment",req.body);
    //validate request
    if(!req.body){
        res.status(400).json({ success: false, 
            message: "content can not be empty"
        });
    }
    const appointmentId = uuidv4();
    //create a new account
    const appointment =new Appointment({
        appointment_id: appointmentId,
        calendar_id: req.body.calendar_id,
        title: req.body.title,
        date:req.body.date,
        description:req.body.description ,
        recurring: req.body.recurring,
        notification: req.body.notification,
        image: req.body.image,
        icon:req.body.icon,
        Synchronize: req.body.Synchronize,
        time_zone: req.body.time_zone,
        startTime: req.body.startTime,
        finishTime: req.body.finishTime,
        username: req.body.username,
        color:req.body.color, 
    });
    await appointment.save();
    res.status(200).send({success:true, message: 'Appointment saved successfully',appointment});
}

// Edit an existing appointment by appointment_id
const editAppointment = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const updatedAppointmentData = req.body;

    // Find the appointment by appointment_id and update it
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { appointment_id },
      updatedAppointmentData,
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.status(200).json({success:true, updatedAppointment});
  } catch (error) {
    console.error('Error editing appointment:', error);
    res.status(500).json({ success: true, message: 'Internal Server Error' });
  }
};

const getAppointment = async(req,res)=> {
  const appointmentId = req.params.appointment_id;

  try {
    // Find the appointment by its appointment_id
    const appointment = await Appointment.findOne({ appointment_id: appointmentId });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    return res.json(appointment);
  } catch (error) {
    console.error('Error retrieving appointment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const deleteAppointment = async(req,res)=>{
    const appointmentId = req.params.appointment_id; 
    try {
      // Find and delete the appointment by its appointment_id
      const deletedAppointment = await Appointment.findOneAndDelete({ appointment_id: appointmentId });
      if (!deletedAppointment) {
        return res.status(404).json({ success: false, message: 'Appointment not found' });
      }
  
      return res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
    } catch (error) {
      console.error('Error deleting Appointment:', error);
      res.status(500).json({success:false,  message: 'Internal Server Error' });
    }
  }


const getAllAppointmentsForUser = async (req, res) => {
  const {username} = req.params; //pass the username as a parameter

  try{
    const appointments= await Reminder.find({username: username});
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({success:false, message: 'Appointment not found' });
    }
    else{
    return res.status(200).json({success:true,reminders});
    }
  }catch(error){
    res.status(500).json({success: false, error:'Internal Server Error'});
  } 
}

const getAppointmentsByCalendarIds = async (req, res) => {
  try {
    const { calendarIds } = req.query; // Extract calendarIds from query parameters

    if (!calendarIds) {
      return res
        .status(400)
        .json({ success: false, message: "Missing calendarIds parameter" });
    }

    // Split the comma-separated calendarIds string into an array
    const calendarIdArray = calendarIds.split(',');

    // Use the Event model to find appointments with matching calendar IDs
    const appointments = await Appointment.find({ calendar_id: { $in: calendarIdArray } });

    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    } else {
      res.status(200).json({ success: true, appointments });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports={
    createAppointment,
    deleteAppointment,
    getAppointment,
    editAppointment,
    getAllAppointmentsForUser,
    getAppointmentsByCalendarIds
}
