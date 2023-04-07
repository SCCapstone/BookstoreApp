const router = require("express").Router();
const { Order, validate } = require("../models/orders");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    console.log(req.body);
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
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    if (req.body.orderStatus) {
      order.orderStatus = req.body.orderStatus;
    }
    await order.save();

    res.send("Updated order status!");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.delete == "DELETE") {
      await Order.deleteOne({ _id: id });
    }
    // if (!user) {
    //   return res.status(404).send({message: "User not found"});
    // } if (user.role !== "admin") {
    //   return res.status(401).send({message: "Unauthorized operation"});
    // }
    await Order.deleteOne({ _id: id });
    res.send("Got a DELETE request at /users");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
