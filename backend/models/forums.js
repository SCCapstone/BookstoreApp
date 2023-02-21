const mongoose = require("mongoose");
const Joi = require("joi");

const reply = {
    replyingUserID: String,
    post: String,
    date: Date,
}

const forumSchema = new mongoose.Schema({
    postingUserID: { type: String, required: true },
    post: { type: String, required: true },
    date: { type: Date, required: true },
    uuid: { type: String, required: true },
    replies: { type: [reply], required: false },
});

// replies will be a json object with name and reply so people can reply

const Forum = mongoose.model("forums", forumSchema);

const validate = (data) => {
    const schema = Joi.object({
        uuid: Joi.string().required().label("User ID"),
        post: Joi.string().required().label("Post"),
        date: Joi.date().required().label("Date Posted"),
    });
    return schema.validate(data);
};

module.exports = { Forum, validate };
