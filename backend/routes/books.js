const router = require("express").Router();
const { Book, validate, validateReview } = require("../models/book");

router.get("/", async (req, res) => {
  try {
    Book.find({}, function (err, books) {
      res.send(books);
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:ids", async (req, res) => {
  const { ids } = req.params;
  console.log(ids);
  try {
    Book.find(
      {
        _id: {
          $in: ids,
        },
      },
      function (err, books) {
        res.send(books);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    req.body.dateAdded = new Date();
    const { error } = validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).send({ message: error.details[0].message });
    }

    const book = await Book.findOne({ title: req.body.title });
    if (book) {
      return res
        .status(409)
        .send({ message: "Book with given title already exists." });
    }
    await new Book({ ...req.body }).save();
    res.status(201).send({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error!!!" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    // we only need to be able to put in new reviews
    // we don't need to be able (necessarily, though it would be nice)
    // to edit all that other junk
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    if (req.body.review) {
      const { error } = validateReview(req.body.review);
      if (error) {
        console.log(error);
        return res.status(400).send({ message: error.details[0].message });
      }

      book.reviews.push(req.body.review);
    }
    await book.save();
    res.send({ message: "Book review added" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Book.deleteOne({ _id: id });
    res.send("Got a DELETE request at /books");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
