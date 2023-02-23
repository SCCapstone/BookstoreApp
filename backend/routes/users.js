const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  try {
    // validates the data and returns error if data is invalid
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // checks to see if the user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists." });

    // user specific posting things -- this is our password hashing/protection
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // finally, after going through some checks, try to save the new user
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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({message: "User not found"});
    }
    // any time where the user is different from the req.body, we want the req.body to prevail
    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = hashPassword(req.body.password);
    }
    if (req.body.role) {
      user.role = req.body.role;
    }
    if (req.body.balance) {
      user.balance = req.body.balance;
    }
    await user.save();
    res.send({message: "User role updated"});
  } catch (error) {
    console.log(error);
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    // if (!user) {
    //   return res.status(404).send({message: "User not found"});
    // } if (user.role !== "admin") {
    //   return res.status(401).send({message: "Unauthorized operation"});
    // }
    await User.deleteOne({ _id: id });
    res.send("Got a DELETE request at /users");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
