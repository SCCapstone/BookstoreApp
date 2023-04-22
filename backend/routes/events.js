const router = require("express").Router();
const { Event, validate } = require("../models/event");

//route to post a new event which utilizes a title and start/end time
router.post("/", async (req, res) => {
  try {
    const newEvent = new Event({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end
    });
    //method to save an event
    const savedEvent = await newEvent.save();
    res.json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: "error message" });
  }
});

//method to find and send an event to a the serve
router.get("/", async (req, res) => {
  try {
    Event.find({}, function (err, events) {
      res.send(events);
    });
  } catch (error) {
    console.log(error);
  }
});

// Route to delete an event
router.delete("/:id", async (req, res) => {
  try {
    Event.findByIdAndDelete(req.params.id, (err, deletedEvent) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      } else if (!deletedEvent) {
        res.status(404).json({ message: "Event not found" });
      } else {
        res.json(deletedEvent);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
