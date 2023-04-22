//this is the backend for the event page which utilizes MongoDB to store all the events
//initialize mongoose, jwt, and Joi
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const Joi = require("joi");

//schema for event which takes a title, start, and end dates
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

//takes the event using the schema and the mongoose data
const Event = mongoose.model("events", eventSchema);

//validate the events using the data and the schema using the tile of the event and the start and end of the event
const validate = (data) => {
  const schema = Joi.object ({
    title: Joi.string().required().label("Title of the Event"),
    start: Joi.date().required().lablel("Start of the Event"),
    end: Joi.date().required().label("End of the Event"),
  });
  return schema.validate(data);
};

module.exports = { Event, validate };
