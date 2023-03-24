const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  stars: { type: Number, required: true },
  summary: { type: String, required: true },
  imageId: { type: String, required: true },
  quantitySold: { type: String, required: false },
  reviews: { type: Array, required: false, default: [] },
  genre: { type: Array, required: true },
  dateAdded: { type: Date, required: false },
});

const Book = mongoose.model("book", bookSchema);

const validateReview = (data) => {
  const reviewSchema = Joi.object({
    user: Joi.string()
      .required()
      .label("userId")
      .error(new Error("Reviewer's User is invalid")),
    post: Joi.string()
      .required()
      .label("post")
      .error(new Error("Post is invalid")),
    date: Joi.date()
      .required()
      .label("ReviewDate")
      .error(new Error("Review Date is invalid")),
  });
  return reviewSchema.validate(data);
};

const validate = (data) => {
  const reviewSchema = Joi.object({
    user: Joi.string()
      .required()
      .label("user")
      .error(new Error("Reviewer's User is invalid")),
    post: Joi.string()
      .required()
      .label("post")
      .error(new Error("Post is invalid")),
    date: Joi.date()
      .required()
      .label("ReviewDate")
      .error(new Error("Review Date is invalid")),
  });

  const schema = Joi.object({
    title: Joi.string()
      .required()
      .label("Title")
      .error(new Error("Title is invalid")),
    author: Joi.string()
      .required()
      .label("Author")
      .error(new Error("Author is invalid")),
    price: Joi.number()
      .required()
      .label("Price")
      .error(new Error("Price is invalid")),
    stock: Joi.number()
      .required()
      .label("Quantity")
      .error(new Error("Stock is invalid")),
    stars: Joi.number()
      .required()
      .label("Stars")
      .error(new Error("Stars is invalid")),
    summary: Joi.string()
      .required()
      .label("Summary")
      .error(new Error("Summary is invalid")),
    imageId: Joi.string()
      .required()
      .label("ImageId")
      .error(new Error("ImageId is invalid")),
    quantitySold: Joi.number()
      .required()
      .label("QuantitySold")
      .error(new Error("Quantity Sold is invalid")),
    reviews: Joi.array()
      .items(reviewSchema)
      .required()
      .label("Reviews")
      .error(new Error("Reviews invalid")),
    genre: Joi.array()
      .items(Joi.string())
      .required()
      .label("Genre")
      .error(new Error("Genre is invalid")),
    dateAdded: Joi.date()
      .required()
      .label("Date Added")
      .error(new Error("Date Added is invalid")),
  });
  return schema.validate(data);
};

module.exports = { Book, validate, validateReview };
