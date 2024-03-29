import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { isAdmin, sendToHome } from "../utils/PermissionUtils";

const EditBlogpage = ({ userRole }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogPost, setBlogPost] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const rBlogPosts = [...blogPosts].reverse();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/blogs");
        if (Array.isArray(response.data)) {
          setBlogPosts(response.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (blog) => {
    blog.preventDefault();
    const newBlogPost = {
      title: blogTitle,
      post: blogPost,
    };
    try {
      const response = await axios.post("/api/blogs", newBlogPost);
      setBlogPosts([...blogPosts, response.data]);
      setBlogPost("");
      setBlogTitle("");
      setSubmitted(true);
      swal.fire({
        title: "Success",
        text: "The blog post has been posted!",
        icon: "success",
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      await axios.delete(`/api/blogs/${id}`);
      const response = await axios.get("/api/blogs");
      setBlogPosts(response.data);
      setBlogPost("");
      setBlogTitle("");
      setSubmitted(false);
      swal.fire({
        title: "Post Deleted",
        text: "The blog post has been deleted!",
        icon: "success",
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return isAdmin(userRole) ? (
    <div className="max-w-screen-md mx-auto p-4 text-center">
      <h1 className="text-2xl font-medium mb-4 text-center">
        Edit the Blog!
      </h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="border-2 focus:shadow-outline focus:bg-white w-full h-12"
          placeholder="Enter blog title here"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          style={{ minHeight: "2em" }}
        />
        <textarea
          className="border-2 focus:shadow-outline focus:bg-white w-full h-48"
          placeholder="Enter blog post here..."
          value={blogPost}
          onChange={(e) => setBlogPost(e.target.value)}
          style={{ minHeight: "2em" }}
        />
        <button
          className=" bg-black text-white py-2 px-4 rounded my-4 focus:shadow-outline"
          type="submit"
        >
          Post
        </button>
      </form>
      {rBlogPosts.map((post, index) => (
        <div key={post._id}>
          <div className="bg-camel px-2 py-2 text-lg mb-4">
            <h2 className="text-xl font-bold break-all">{post.title}</h2>
            <p className="whitespace-normal break-all">{post.post}</p>
          </div>
          <button
            className="bg-black text-white py-2 px-4 rounded my-4 focus:shadow-outline whitespace-normal break-all"
            onClick={() => handleDelete(post._id, index)}
          >
            Delete {post.title}
          </button>
        </div>
      ))}
    </div>
  ) : (
    (sendToHome(),
      (
        <div>
          <h1>Restricted to administrators only!</h1>
        </div>
    ))
  );
};

export default EditBlogpage;
