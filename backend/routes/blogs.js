const router = require("express").Router();
const { Blog, validate } = require("../models/blog");

//router post for blogs using a try catch method
router.post("/", async (req, res) => {
  try {
    const newBlog = new Blog({
      title: req.body.title, 
      post: req.body.post 
    });
    //method to save blog, if it doesn't work then show an error message
    const savedBlog = await newBlog.save();
    res.json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: "error message" });
  }
});

//router for the blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//method to delete a blog 
//the way to delete is find by ID and delete and if doesn't work return a server error
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
