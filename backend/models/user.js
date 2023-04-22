//this is the backend for the user page which utilizes MongoDB to store all the user 
//initialize mongoose, jwt, Joi, and password complexity 
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

/**
 *   const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "customer",
    balance: 0,
    favorites: [],
    verifyEmailToken: "",
    updatePasswordToken: "",
    emailVerified: false
  });
 */

//schema for the user which utilizes mongoose
//stores the firstName, lastName, email, password, password, role (either customer or admin), balance, favorites, verifyEmailToke, updatePasswordToken, and emailVerified
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["admin", "customer"] },
  balance: { type: mongoose.Schema.Types.Decimal128, required: false },
  favorites: { type: Array, required: false },
  verifyEmailToken: { type: String, required: false },
  updatePasswordToken: { type: String, required: false },
  emailVerified: { type: Boolean, required: false }
});

//utilizes the user schema to generate an authunticated token which can be used
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

//mongoose model which utilizes the userSchema
const User = mongoose.model("user", userSchema);

//function to validate the user 
//@params which stores all the parts required in the data for the user in MongoDB
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
    verifyEmailToken: Joi.string().label("Verified Email Token"),
    updatePasswordToken: Joi.string().label("Forgot password token"),
    emailVerified: Joi.boolean().label("Is the user email verified")
  });
  return schema.validate(data);
};

module.exports = { User, validate };
