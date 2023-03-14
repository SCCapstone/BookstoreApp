const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  newBalance: { type: Number, required: true },
  role: { type: String, required: true },
  order: { type: Object, required: true },
  orderPrice: { type: Number, required: true },
  orderDate: { type: String, required: true },
  orderStatus: { type: String, required: true },
});

const Order = mongoose.model("orders", orderSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .label("firstName")
      .error(new Error("firstName is invalid")),
    lastName: Joi.string()
      .required()
      .label("lastName")
      .error(new Error("lastName is invalid")),
    email: Joi.string()
      .required()
      .label("email")
      .error(new Error("email is invalid")),
    newBalance: Joi.number()
      .required()
      .label("balance")
      .error(new Error("balance is invalid")),
    role: Joi.string()
      .required()
      .label("role")
      .error(new Error("role is invalid")),
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
