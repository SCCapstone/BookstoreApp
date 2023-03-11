const router = require("express").Router();
const { Book, validate } = require("../models/book");

router.post("/", async (req, res) => {
  try {
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

// router.get("/", async (req, res) => {
//   try {
//     Book.find({}, function (err, books) {
//       res.send(books);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Book.deleteOne({ _id: id });
//     res.send("Got a DELETE request at /books");
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
