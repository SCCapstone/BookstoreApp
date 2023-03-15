import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert2";

const EditBlogpage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogPost, setBlogPost] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSave = () => {
    const newBlogPost = { title: blogTitle, post: blogPost };
    setBlogPosts([...blogPosts, newBlogPost]);
    setBlogPost("");
    setBlogTitle("");
    setSubmitted(true);
    swal.fire({
      title: "Success",
      text: "The blog post has been posted!",
      icon: "success"
    });
  };

  const handleDelete = (index) => {
    const newBlogPosts = [...blogPosts];
    newBlogPosts.splice(index, 1);
    setBlogPosts(newBlogPosts);
    setBlogPost("");
    setBlogTitle("");
    setSubmitted(false);
    swal.fire({
      title: "Post Deleted",
      text: "The blog post has been deleted!",
      icon: "success"
    });
  };

  return (
    <div className="max-w-screen-md mx-auto p-4 text-center">
      <h1 className="text-2xl font-medium mb-4 text-center">
        Edit the Blog!
      </h1>
      <textarea
        className="border-2 focus:shadow-outline focus:bg-white w-full h-12"
        placeholder="Enter blog title here"
        value={blogTitle}
        onChange={(e) => setBlogTitle(e.target.value)}
      />
      <textarea
        className="border-2 focus:shadow-outline focus:bg-white w-full h-48"
        placeholder="Enter blog post here..."
        value={blogPost}
        onChange={(e) => setBlogPost(e.target.value)}
      />
      <button
        className=" bg-black text-white py-2 px-4 rounded my-4 focus:shadow-outline"
        onClick={handleSave}
      >
        Post
      </button>
      {blogPosts.map((post, index) => (
        <div>
          <div key={index} className="bg-camel px-2 py-2 text-lg mb-4">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.post}</p>
          </div>
          <button
            className=" bg-black text-white py-2 px-4 rounded my-4 focus:shadow-outline"
            onClick={() => handleDelete(index)}
          >
            Delete {post.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditBlogpage;
