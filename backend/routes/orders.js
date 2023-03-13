const router = require("express").Router();
const { Order, validate } = require("../models/orders");

router.post("/", async (req, res) => {
  // console.log("are we hittin");
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });
      await new Order(req.body).save();
      res.status(201).send({ message: "Order created successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal server error!!!" });
    }
  });

router.get("/", async (req, res) => {
    try {
      Order.find({}, function (err, orders) {
        res.send(orders);
      });
    } catch (error) {
      console.log(error);
    }
});

module.exports = router;
