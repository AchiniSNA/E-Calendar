const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');

const reminderSchema = new mongoose.Schema({
    reminder_id: {
      type: String,
      required: [true, "calendar id is Required"],
    },
    calendar_id: {
        type: String,
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
    time_zone:{
        type: String,
        required: [false, "timeZone is not required"],
    },
    time:{
        type: String,
        required: [true, "time is required"],
    },
  });
  
  
  module.exports = mongoose.model("reminder", reminderSchema);