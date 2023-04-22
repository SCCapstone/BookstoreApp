//this is the backend for the forum page which utilizes MongoDB to store all the forums
//initialize mongoose and Joi
const mongoose = require("mongoose");
const Joi = require("joi");

//the reply function uses the replyingUserID which is a String, a post which is a String, and a date which is a date format
const reply = {
    replyingUserID: String,
    post: String,
    date: Date,
}

//forum schema which stores the schema in mongoose which has a post, date, uuid, (all type string and true) and replies which is of type reply and set to false
const forumSchema = new mongoose.Schema({
    post: { type: String, required: true },
    date: { type: String, required: true },
    uuid: { type: String, required: true },
    replies: { type: [reply], required: false },
});

// replies will be a json object with name and reply so people can reply
const Forum = mongoose.model("forums", forumSchema);

//validate forums and put into the data using the User ID, post, and the date of when it was posted 
//@param data used to store in monoDB
const validate = (data) => {
    const schema = Joi.object({
        uuid: Joi.string().required().label("User ID"),
        post: Joi.string().required().label("Post"),
        date: Joi.date().required().label("Date Posted"),
    });
    return schema.validate(data);
};

module.exports = { Forum, validate };
