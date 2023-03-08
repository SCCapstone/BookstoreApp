const router = require("express").Router();
const { Event, validate } = require("../models/event");

router.post("/", async (req, res) => {
  try {
    const newEvent = new Event({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end
    });
    const savedEvent = await newEvent.save();
    res.json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: "error message" });
  }
});

// Route to delete an event
router.delete('/events/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.json(deletedEvent);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;