const express = require("express");
const router = express.Router();
const config = require("config");
const { Pal, schema } = require("../models/pal");

// Get all pals
router.get("/", async (req, res) => {
  try {
    const pals = await Pal.find();
    res.send(pals);
  } catch (err) {
    res.status(500).send("Something went wrong...");
  }
});

module.exports = router;
