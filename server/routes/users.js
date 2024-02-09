const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser, validateLogin } = require("../models/user");

// Register a new user
router.post("/register", async (req, res) => {
  // Validate the request body
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered...");

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  // Save the user to the database
  try {
    await user.save();
    // res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong...");
  }

  // Generate a JSON Web Token
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
});
// ------------------------------------------------------------

// Login a user
router.post("/login", async (req, res) => {
  // Validate the user input
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the user is registered
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password.");
  }

  // Check if the password is valid
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password.");
  }

  // Send the user object back to the client
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(token);
});
// ------------------------------------------------------------

// Update a user
router.put("/:id", async (req, res) => {
  // Validate the request body
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update the user
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      pals: req.body.pals,
    },
    { new: true }
  );

  // Send the updated user back to the client
  res.send(user);
});

// ------------------------------------------------------------
// Get a user's pals
router.get("/:id", async (req, res) => {
  // Find the user
  const user = await User.findById(req.params.id);

  // Send the user's pals back to the client
  res.send(user.pals);
});

module.exports = router;
