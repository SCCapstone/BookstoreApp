const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // password: passwordComplexity().required().label("Password"),
  role: { type: String, required: true, enum: ["admin", "customer"]},
  balance: { type: mongoose.Schema.Types.Decimal128, required: false },
  
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
  };
  const passwordComplexitySchema = passwordComplexity(complexityOptions)
    .required()
    .label("Password")
    .message(
      "Password should be 8-30 characters long and should contain at least one lowercase letter, one uppercase letter, one number, and one special character."
    );
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().required().label("Email"),
    password: passwordComplexitySchema,
    role: Joi.string().required().valid("admin", "customer").label("Role"),
    balance: Joi.number().required().label("Balance"),
  });
  return schema.validate(data);

};

module.exports = { User, validate };
