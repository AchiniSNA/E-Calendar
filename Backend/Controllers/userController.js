const validate = require("../Models/userModel");
const userModel = require("../Models/userModel");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  const username = req.params.username;

  try {
    // Find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const registerAccount = async (req, res) => {
  console.log("registering new account", req.body);

  try {
    // Validate the request body using the validate function from the user model
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let newUser = await User.findOne({ username: req.body.username });

    if (newUser) {
      return res.status(410).send("User already exists");
    }

    // Create a new account
    const account = new User({
      username: req.body.username,
      password: req.body.password,
      account_number: req.body.account_number,
      branch: req.body.branch,
      name: req.body.name,
      phone_number: req.body.phone_number,
      email: req.body.email,
      // google_calendar: req.body.google_calendar,
      // apple_calendar: req.body.apple_calendar,
      // time_zone: req.body.time_zone,
    });

    await account.save();
    res.status(200).json({ success: true, account });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const loginAccount = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Password is correct, you can send the user data as a response
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkUniqueUsername = async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ username });
    res.json({ isUnique: !user });
  } catch (error) {
    console.error("Error checking username uniqueness:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerAccount,
  getUser,
  loginAccount,
  checkUniqueUsername,
};
