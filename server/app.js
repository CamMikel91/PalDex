const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const PORT = config.get("port");
const pals = require("./routes/pals");

// Connect to MongoDB
mongoose
  .connect(config.get("db"))
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

// Set up routes
app.use(express.json());
app.use("/pals", pals);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
