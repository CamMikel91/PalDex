const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

// user = {
//   name: "John Doe",
//   email: "email@email.com",
//   password: "password",
//   pals: [
//     {
//       palId: 1,
//       count: 0
//     }
//   ]
// }

// Define the schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pals: [
    {
      id: { type: Number, required: true },
      count: { type: Number, required: true },
    },
  ],
});

// Define the custom method to generate an auth token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

// Create the model
const User = mongoose.model("User", userSchema);

// Define the validation schema
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string(),
  pals: Joi.array().items(
    Joi.object({
      _id: Joi.string(),
      id: Joi.number(),
      count: Joi.number(),
    })
  ),
});

function validateUser(user) {
  return schema.validate(user);
}

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
