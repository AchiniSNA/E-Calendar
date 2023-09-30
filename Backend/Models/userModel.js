const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "username is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is Required"],
    },
    account_number:{
        type: String,
        required:[true,"account number is Required"],
    },
    branch:{
        type: String,
        required: [true, "branch is required"],
    },
    name:{
        type: String,
        required: [true, "name is required"],
    },
    phone_number:{
        type: String,
        required: [true, "phone number is required"],
    },
    email:{
        type: String,
        required: [false, "email is not required"],
    },
    google_calendar:{
        type: String,
        required: [false, "google calendar is not required"],
    },
    apple_calendar:{
        type: String,
        required: [false, "applecalendar is not required"],
    },
    time_zone:{
        type: String,
        required: [false, "timeZone is not required"],
    },
  });   
  

  userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

function validateUser(user){
    const schema={
        username: Joi.string().min(5).max(50).required(),
        password: Joi.string(),
        account_number: Joi.string(),
        branch: Joi.string(),
        name:Joi.string(),
        phone_number :Joi.string(),
        email: Joi.string().email({
            minDomainSegments: 2, // Ensure there are at least two domain segments (e.g., example.com)
            tlds: { allow: true }, // Allow top-level domains (e.g., .com, .net)
        }),
        google_calendar: Joi.string().email(),
        apple_calendar:Joi.string(),
        time_zone: Joi.string(),
    };
    return Joi.validate(user,schema);
  }
  
module.exports = mongoose.model("users", userSchema);
exports.validate=validateUser;