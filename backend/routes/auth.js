const router = require("express").Router();
const Joi = require("joi");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

//router post for authuntication 
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

      //validate the password by byte encryption comparsion 
      const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //checks if the password is incorrect and sends an error message if it is
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    //generates an authuntication token which gets a token, the user id, the user role, and user's first and last name
      const token = user.generateAuthToken();
    res.status(200).send({
      data: {
        token: token,
        userID: user.id,
        userType: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//validation schema which takes the email and password 
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
