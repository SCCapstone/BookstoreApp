const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["admin", "customer"] },
  balance: { type: mongoose.Schema.Types.Decimal128, required: false },
  favorites: { type: Array, required: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
    // password: passwordComplexity.required().label("Password")
    role: Joi.string().required().valid("admin", "customer").label("Role"),
    balance: Joi.number().required().label("Balance"),
    favorites: Joi.array()
      .items(Joi.string().guid())
      .required()
      .label("Favorites")
      .error(new Error("Favorites is invalid")),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
