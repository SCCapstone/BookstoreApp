import React, { useState, useEffect } from "react";
import axios from "axios";

const EditBlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
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

  return (
    <div> 
      {rBlogPosts.map((post, index) => (
        <div key={post._id}>
          <div className="bg-camel px-2 py-2 text-lg mb-4">
            <h2 className="text-xl font-bold break-all">{post.title}</h2>
            <p className="whitespace-normal break-all">{post.post}</p>
        </div>
        </div>
      ))}
    </div>
  );
};

export default EditBlogList;
