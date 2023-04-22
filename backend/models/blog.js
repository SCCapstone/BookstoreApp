//this is the backend for the blog page which utilizes MongoDB to store the blogs 
//initialize mongoose, jwt, and Joi
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const Joi = require("joi");

//blog schema which takes the title and post of the users and stores in the backend 
//must be of type String and must be true 
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  post: { type: String, required: true },
});

//mongoose model for blogs which utilizes the schema 
const Blog = mongoose.model("blogs", blogSchema);

//@params data - used to store the blogs
//validates the blog using the title and the content 
const validate = (data) => {
  const schema = Joi.object ({
    title: Joi.string().required().label("Title of the Event"),
    post: Joi.string().required().label("Content of the Event"),
  });
  return schema.validate(data);
};

module.exports = { Blog, validate };
