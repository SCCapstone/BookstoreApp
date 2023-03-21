import React, { Component } from "react";
import axios from "axios";
import swal from 'sweetalert2';
import { Autocomplete, TextField } from "@mui/material";

export default class CreateForum extends Component {
    constructor(props) {
      super(props);
      // this.handleChange = this.handleChange.bind(this);
      this.state = {
        message: "",
        user: {},
        book: null,
        inputBook: null,
        books: [],
      };
    }
    // [data, setData] = useState({
    //     message: "",
    //     name: "",
    //     book: null,
    //     books: [],
    //   });

    // const [error, setError] = useState("");

    async componentDidMount() {
      const url = "/api/books";

      await axios.get(url).then(res => {
        if (res.status === 200) {
          let books = res.data;
          console.log(books);

          this.setState((state) => ({
              books: books 
          }));
        }
      });

      const userURL = "/api/users" + localStorage.getItem("userID");
      
      await axios.get(userURL).then(res => {
        if (res.status === 200) {
          let user = res.data;
          console.log(user);
          this.setState((state) => ({
            user: user
          }));
        }
      });
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
        const url = "/api/books/" + this.state.book.id;
        const text = this.state.message;
        const uuid = this.state.user.firstName;
        const theReview = {review: {
            user: uuid,
            post: text,
            date: Date().toString(),
        }};
        console.log(theReview);
        const res = await axios.put(url, theReview);
        console.log(res.data);
        swal.fire({
          icon: 'success',
          title: "Hi",
          text: res
        })
    }

    render () { return (
    <section className="">
    <div className="py-4">
      <div className="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
        Post a Forum
      </div>
    <Autocomplete
      className="rounded border bg-white py-2 max-w-[1158px] px-4 w-[500px] xl:w-[1100px] lg:w-[600px] md:w-[500px]"
      onChange={(event, newValue) => {
        this.setState((state) => ({
            book: newValue
        }));
        }}
        inputValue={this.state.inputBook}
        onInputChange={(event, newInputValue) => {
            this.setState((state) => ({
                inputBook: newInputValue
            }));
        }}
        options={this.state.books}
        getOptionLabel={(option) => option.title}
        groupBy={(option) => option.genre[0] }
        filterOptions={this.filterOptions}
        renderInput={(params) => (
            <TextField
                {...params}
                variant="filled"
                label="Select"
                placeholder="Select Book"
            />
        )}
    />
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
    )
    }
}
