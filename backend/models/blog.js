const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const Joi = require("joi");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Event = mongoose.model("blogs", blogSchema);

const validate = (data) => {
  const schema = Joi.object ({
    title: Joi.string().required().label("Title of the Event"),
    content: Joi.string().required().label("Content of the Event"),
  });
  return schema.validate(data);
};

module.exports = { Blog, validate };
