const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const reply = {
    replyingUserID: String,
    post: String,
    date: Date,
}

const orderSchema = new mongoose.Schema({
    post: { type: String, required: true },
    date: { type: String, required: true },
    uuid: { type: String, required: true },
    replies: { type: [reply], required: false },
});


const Order = mongoose.model("orders", orderSchema);

const validate = (data) => {
    const schema = Joi.object({
        uuid: Joi.string().required().label("User ID"),
        post: Joi.string().required().label("Post"),
        date: Joi.date().required().label("Date Posted"),
    });
    return schema.validate(data);
};

module.exports = { Order, validate };
