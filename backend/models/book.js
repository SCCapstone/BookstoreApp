const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  post: { type: String, required: true }, 
  date: { type: String, required: true}
})

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  stars: { type: Number, required: true },
  summary: { type: String, required: true },
  imageId: { type: String, required: true },
  quantitySold: { type: String, required: false },
  reviews: { type: [reviewSchema], required: false}
});

bookSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const Book = mongoose.model("book", bookSchema);

const validate = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .required()
      .label("Title")
      .error(new Error("Title is bad")),
    author: Joi.string()
      .required()
      .label("Author")
      .error(new Error("Author is bad")),
    price: Joi.number()
      .required()
      .label("Price")
      .error(new Error("Price is bad")),
    stock: Joi.number()
      .required()
      .label("Quantity")
      .error(new Error("Stock is bad")),
    stars: Joi.number()
      .required()
      .label("Stars")
      .error(new Error("Stars is bad")),
    summary: Joi.string()
      .required()
      .label("Summary")
      .error(new Error("Summary is bad")),
    imageId: Joi.string()
      .required()
      .label("ImageId")
      .error(new Error("ImageId is bad")),
    quantitySold: Joi.number()
      .required()
      .label("QuantitySold")
      .error(new Error("Quantity Sold is bad")),
  });
  return schema.validate(data);
};

module.exports = { Book, validate };
