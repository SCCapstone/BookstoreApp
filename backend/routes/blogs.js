const router = require("express").Router();
const { Blog, validate } = require("../models/blog");

router.post("/", async (req, res) => {
  try {
    const newBlog = new Blog({
      title: req.body.title, 
      post: req.body.post 
    });
    const savedBlog = await newBlog.save();
    res.json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: "error message" });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    Blog.findByIdAndDelete(req.params.id, (err, deletedBlog) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      } else if (!deletedBlog) {
        res.status(404).json({ message: "Blog not found" });
      } else {
        res.json(deletedBlog);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
  
module.exports = router;
