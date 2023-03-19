const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const Joi = require("joi");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  post: { type: String, required: true },
});

const Blog = mongoose.model("blogs", blogSchema);

const validate = (data) => {
  const schema = Joi.object ({
    title: Joi.string().required().label("Title of the Event"),
    post: Joi.string().required().label("Content of the Event"),
  });
  return schema.validate(data);
};

module.exports = { Blog, validate };
