const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');

const calendarSchema = new mongoose.Schema({
    calendar_id: {
      type: String,
      required: [true, "calendar id is Required"],
    },
    username: {
        type: String,
        required: [true, "username is Required"],
    },
    account_number:{
        type: String,
        required:[true,"account number is Required"],
    },
    access:{
        type: Array,
        required: [true, "access is required"],
    },
    name:{
        type: String,
        required: [true, "name is required"],
    },
  });
  
  
  module.exports = mongoose.model("calendars", calendarSchema);