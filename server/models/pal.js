const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema
const palSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  key: { type: String, required: true },
  image: { type: String, required: false },
  name: { type: String, required: true },
  wiki: { type: String, required: false },
  types: { type: Array, required: true },
  imageWiki: { type: String, required: false },
  suitability: { type: Array, required: true },
  drops: { type: Array, required: true },
  aura: { type: Object, required: true },
  description: { type: String, required: true },
  skills: { type: Array, required: true },
  stats: { type: Object, required: true },
  asset: { type: String, required: true },
  genus: { type: String, required: true },
  rarity: { type: Number, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  maps: { type: Object, required: false },
});

// Create the model
const Pal = mongoose.model("Pal", palSchema);

// Define the validation schema
const schema = Joi.object({
  id: Joi.number().required(),
  key: Joi.string().required(),
  image: Joi.string().required(),
  name: Joi.string().required(),
  wiki: Joi.string().required(),
  types: Joi.array().required(),
  imageWiki: Joi.string().required(),
  suitability: Joi.array().required(),
  drops: Joi.array().required(),
  aura: Joi.object().required(),
  description: Joi.string().required(),
  skills: Joi.array().required(),
  stats: Joi.object().required(),
  asset: Joi.string().required(),
  genus: Joi.string().required(),
  rarity: Joi.number().required(),
  price: Joi.number().required(),
  size: Joi.string().required(),
  maps: Joi.object().required(),
});

exports.Pal = Pal;
exports.schema = schema;
