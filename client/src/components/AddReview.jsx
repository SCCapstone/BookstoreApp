import React, { Component } from "react";
import axios from "axios";
import swal from 'sweetalert2';
import { isLoggedIn } from "../utils/PermissionUtils";

export default class AddReview extends Component {
    constructor(props) {
      super(props);
      this.state = {
        message: "",
        book: null,
      };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((state => ({
          ...state,
          [name]: value,
        })));
    }
  // Form Change Method
    handleSubmit = async(e) => {
        e.preventDefault();
        // hard code this for one book first to see if it works
        const url = "/api/books/" + this.props.book._id;
        const text = this.state.message;
        const uuid = this.props.currentUser;
        const theReview = {review: {
            user: uuid,
            post: text,
            date: new Date(),
        }};
        await axios.put(url, theReview).then((res) => {
            if (res.status === 200) {
                window.location.reload();
            } else {
                swal.fire({
                    icon: 'error',
                    title: "Error posting review"
                });
            }
        });
    }

    render () { 
      return isLoggedIn(this.props.currentUser) ? (
        <section className="">
          <div className="py-4">
            <div className="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
              Post a Review
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>What would you like to share about this book? </label>
              <textarea
                name="message"
                value={this.state.message}
                onChange={this.handleChange}
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
    ) : (
      (
        <div>
          <h1>Log in to post a review!</h1>
        </div>
      )
    );
  }
}
