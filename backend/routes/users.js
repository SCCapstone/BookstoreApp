const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists." });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error!!!" });
  }
});

router.get("/", async (req, res) => {
  try {
    User.find({}, function (err, users) {
      res.send(users);
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.deleteOne({ _id: id });
    res.send("Got a DELETE request at /users");
  } catch (error) {
    console.log(error);
  }
});

export const updateProfile = tryCatch(async(req, res)=> {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {new:true})
  const { firstName, lastName, email, password } = updatedUser
});

module.exports = router;
