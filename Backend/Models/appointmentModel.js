const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');

const appointmentSchema = new mongoose.Schema({
    appointment_id: {
      type: String,
      required: [true, "calendar id is Required"],
    },
    calendar_id: {
        type: Array,
        required: [true, "calendar id is Required"],
    },
    title:{
        type: String,
        required:[true,"title is Required"],
    },
    date:{
        type: String,
        required: [true, "date is required"],
    },
    description:{
        type: String,
        required: [false, "description is not required"],
    },
    recurring:{
        type: String,
        required: [false, "recurring is not required"],
    },
    notification:{
        type: String,
        required: [false, "notification is not required"],
    },
    image:{
        type: String,
        required: [false, "image is not required"],
    },
    icon:{
        type: String,
        required: [false, "icon is not required"],
    },
    username: {
        type: String,
        required: [true, "username is Required"],
    },
    Synchronize:{
        type: Array,
        required: [false, "synchronize is not required"],
    },
    time_zone:{
        type: String,
        required: [false, "timeZone is not required"],
    },
    startTime:{
        type: String,
        required: [true, "Starting time is required"],
    },
    finishTime:{
        type: String,
        required: [true, "Finishing time is required"],
    },
  });
  
  
  module.exports = mongoose.model("appointments", appointmentSchema);
