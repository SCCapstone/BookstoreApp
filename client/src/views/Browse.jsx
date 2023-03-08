import React, { Component } from "react";
import axios from "axios";
import defaultBooks from "./Books";
import sort from "../components/sort";
import { Autocomplete, TextField } from "@mui/material";

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      book: null,
      inputBook: null,
      value: "Relevant"
    };
  }

  async componentDidMount() {
    const url = "/api/books";

    await axios.get(url).then(res => {
      if (res.status === 200) {
        let books = res.data;
        console.log(books);

        this.setState((state) => ({
            books: books 
        }));
      } else {
        this.setState((state) => ({
          books: defaultBooks
        }));
        console.log(defaultBooks);
      }
    });
  }
  // const book_instance = localStorage.getItem("Book");

  changeOption(option) {
    this.setState((state) => ({
      value: option
    }));
    // localStorage.setItem("option", option);
  }

  // let prevOption = localStorage.getItem("option");
  // if (prevOption) {
  //   setValue(prevOption);
  // }
  // console.log(prevOption);
  // console.log(prevOption);


  render() {
    return (
      <section className="sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1150px] xl:max-w-[1200px] max-w-[200px]">
        <div class="py-4">
          <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
            Browse
          </div>
        </div>

        {/* <div class=" xl:w-8/12 lg:w-8/12 md:w-4/12 w-4/12 py-2 grid">
          <p className={`${styles.paragraph} max-w-[1158px] relative grid gap-2`}>
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              className="rounded border bg-white py-2 grid max-w-[1158px] px-4 w-[500px] xl:w-[1100px] lg:w-[600px] md:w-[500px] pl-10"
              placeholder="Search Books"
            />
          </p>
        </div> */}

        <div class="flex pb-2">
          <Autocomplete
            className="rounded border bg-white py-2 max-w-[1158px] px-4 w-[500px] xl:w-[1100px] lg:w-[600px] md:w-[500px]"
            value={this.state.book}
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
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="filled"
                    label="Search"
                    placeholder="Search Books"
                />
            )}
          />
        </div>

        <div class="flex pb-2">
          <select
            className="rounded border bg-white py-2 grid max-w-[1158px] px-4 w-[500px] xl:w-[1100px] lg:w-[600px] md:w-[500px]"
            onChange={(e) => this.changeOption(e.target.value)}
          >
            <option selected disabled hidden>
              Sort by:
            </option>
            <option value="Relevant">Relevant</option>
            <option value="Best Selling">Best Selling</option>
            <option value="New Arrivals">New Arrivals</option>
            <option value="Price: low to high">Price: low to high</option>
            <option value="Price: high to low">Price: high to low</option>
          </select>

          {/* <select className="w-1/6 ... bg-white border ">
            <option selected disabled hidden>
              Genre
            </option>
          </select> */}
        </div>

        <div>
          <hr className="pt-2" />
          <div>{sort(this.state.books, this.state.value)}</div>
        </div>
      </section>
    );
  }
};

export default Browse;
