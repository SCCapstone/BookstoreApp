const router = require("express").Router();
const { Forum, validate } = require("../models/forum");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    await new Forum(req.body).save();
    res.status(201).send({ message: "Forum created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error!!!" });
  }
});

router.get("/", async (req, res) => {
  try {
    Forum.find({}, function (err, forums) {
      res.send(forums);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
