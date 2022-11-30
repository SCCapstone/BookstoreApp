const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  console.log("Hello!");
  try {
    console.log(req.body);
    const { error } = validate(req.body);
    console.log(error);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists." });

    console.log("we are trying to post!");

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    console.log(salt);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashPassword);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error!!!" });
  }
});

module.exports = router;
