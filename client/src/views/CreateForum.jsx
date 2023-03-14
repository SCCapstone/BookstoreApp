import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert2';

const CreateForum = (user) => {
    const [data, setData] = useState({
        message: "",
        name: "",
      });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
        ...data,
        [name]: value,
        });
    }
  // Form Change Method
    const handleSubmit = async(e) => {
        e.preventDefault();
        // hard code this for one book first to see if it works
        const url = "/api/books/6410c9929cc43ded2c83bf9f/";
        const text = data.message;
        const uuid = data.name;
        const theReview = {review: {
            user: uuid,
            post: text,
            date: Date().toString(),
        }};
        console.log(theReview);
        const res = await axios.put(url, theReview);
        swal.fire({
          icon: 'success',
          title: 'Forum posted successfully'
        })
    }

    return (
    <section className="">
    <div className="py-4">
      <div className="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
        Post a Forum
      </div>
    </div>
      <form onSubmit={handleSubmit}>
            <div>
              <label>What book are you reading, and what would you like to share about it? </label>
              <textarea
                name="message"
                value={data.message}
                onChange={handleChange}
                className="form-control placeholder-black block w-full px-4 py-6 text-xl font-normal text-black bg-camel focus:bg-white border border-solid border-black rounded"
              />
              <label>Name </label>
              <textarea
                name="name"
                value={data.name}
                onChange={handleChange}
                className="form-control placeholder-black block w-full px-4 py-6 text-xl font-normal text-black bg-camel focus:bg-white border border-solid border-black rounded"
              />
            </div>
            <div className="py-2">
              <input
                type="submit"
                value="Post"
                className="inline-block px-10 py-3 bg-persian_plum font-semibold text-white font-medium leading-snug uppercase rounded"
              />
            </div>
        </form>
        </section>
    )
}

export default CreateForum;
