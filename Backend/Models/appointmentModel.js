const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');

const appointmentSchema = new mongoose.Schema({
    appointment_id: {
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
    Synchronize:{
        type: Array,
        required: [false, "synchronize is not required"],
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
  
  
  module.exports = mongoose.model("appointments", appointmentSchema);