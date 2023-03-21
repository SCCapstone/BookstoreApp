const router = require("express").Router();
const { Order, validate } = require("../models/orders");

router.post("/", async (req, res) => {
  // console.log("are we hittin");
  // console.log(req);
  try {
    const { error } = validate(req.body);
    // console.log(req);
    // console.log(req.body);
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

router.put("/:id", async (req, res) => {
  console.log("We're hittin!");
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    // console.log(order);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    order.orderStatus = req.body.orderStatus;
    console.log(req.body.orderStatus)
    await order.save();
    res.send("Updated order status!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
