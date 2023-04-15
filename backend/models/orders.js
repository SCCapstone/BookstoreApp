const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  order: { type: Object, required: true },
  orderPrice: { type: Number, required: true },
  orderDate: { type: String, required: true },
  orderStatus: { type: String, required: true },
});

const Order = mongoose.model("orders", orderSchema);

const validate = (data) => {
  const schema = Joi.object({
    userId: Joi.string()
      .required()
      .label("User ID")
      .error(new Error("Invalid User ID")),
    order: Joi.object()
      .required()
      .label("order")
      .error(new Error("order is invalid")),
    orderPrice: Joi.number()
      .required()
      .label("orderPrice")
      .error(new Error("orderPrice is invalid")),
    orderDate: Joi.string()
      .required()
      .label("orderDate")
      .error(new Error("orderDate is invalid")),
    orderStatus: Joi.string()
      .required()
      .label("orderStatus")
      .error(new Error("orderStatus is invalid")),
  });
  return schema.validate(data);
};

module.exports = { Order, validate };
