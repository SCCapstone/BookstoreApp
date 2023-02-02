const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
    uuid: { type: String, required: true },
    bookId: { type: String, required: true },
    post: { type: String, required: true },
});

const Post = mongoose.model("post", postSchema);

const validate = (data) => {
    const schema = Joi.object({
        uuid: Joi.string().required().label("User ID"),
        bookId: Joi.string().required().label("Book ID"),
        post: Joi.string().required().label("Post"),
    });
    return schema.validate(data);
};

module.exports = { Post, validate };
