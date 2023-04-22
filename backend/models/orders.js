//this is the backend for the orders page which utilizes MongoDB to store all the orders
//initialize mongoose and Joi
const mongoose = require("mongoose");
const Joi = require("joi");

//schema for orders using mongoDB
//utilizes the userID (type String), order (type Object), orderPrice (type number), orderDate (type String), and orderStatus (type String)
//all are set to required 
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  order: { type: Object, required: true },
  orderPrice: { type: Number, required: true },
  orderDate: { type: String, required: true },
  orderStatus: { type: String, required: true },
});

//order for the MongoDB using the order schema
const Order = mongoose.model("orders", orderSchema);

//validate orders with the userID, order, orderPrice, orderDate, and orderStatus and checks for the error using the Joi 
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
