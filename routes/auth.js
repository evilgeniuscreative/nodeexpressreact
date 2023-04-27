const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @route   GET /api/auth/test
// @desc    Test the autho route
// @access  Public
router.get("/test", (req, res) => {
  res.send("Auth route working");
});

// @route   POST /api/auth/register
// @desc    Create a new user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    // encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // create new user
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });

    const savedUser = await newUser.save();

    // return new user
    res.json(savedUser);
  } catch (err) {
    // error here
    console.log("error:", err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
