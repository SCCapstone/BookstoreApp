const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const Joi = require("joi");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

const Event = mongoose.model("events", eventSchema);

const validate = (data) => {
  const schema = Joi.object ({
    title: Joi.string().required().label("Title of the Event"),
    start: Joi.date().required().lablel("Start of the Event"),
    end: Joi.date().required().label("End of the Event"),
  });
  return schema.validate(data);
};

module.exports = { Event, validate };
