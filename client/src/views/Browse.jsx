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
      value: "Relevant",
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
    // let books = JSON.parse(localStorage.getItem("booksFromTheDatabase"));
    // this.setState((state) => ({
    //   books: books,
    // }));
  }

  changeOption(option) {
    this.setState((state) => ({
      value: option,
    }));
  }

  filterOptions = (options, state) => {
    let newOptions = [];
    options.forEach((element) => {
      const baseTitle = element.title.replace(",", "").toLowerCase();
      const baseAuthor = element.author.replace(",", "").toLowerCase();
      const baseGenre = element.genre[0].replace(",", "").toLowerCase();
      const baseInput = state.inputValue.toLowerCase();
      if (
        baseTitle.includes(baseInput) ||
        baseAuthor.includes(baseInput) ||
        baseGenre.includes(baseInput)
      )
        newOptions.push(element);
    });
    return newOptions;
  };

  render() {
    return (
      <section className="sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1150px] xl:max-w-[1200px] max-w-[200px]">
        <div class="py-4">
          <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
            Browse
          </div>
        </div>

        <div class="flex pb-2">
          <Autocomplete
            className="rounded border bg-white py-2 max-w-[1158px] px-4 w-[500px] xl:w-[1100px] lg:w-[600px] md:w-[500px]"
            value={this.state.book}
            onChange={(event, newValue) => {
              window.location = `/${newValue.author}/${newValue.title}`;
              this.setState((state) => ({
                book: newValue,
              }));
            }}
            inputValue={this.state.inputBook}
            onInputChange={(event, newInputValue) => {
              this.setState((state) => ({
                inputBook: newInputValue,
              }));
            }}
            options={this.state.books}
            getOptionLabel={(option) => option.title}
            groupBy={(option) => option.genre[0]}
            filterOptions={this.filterOptions}
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
        </div>

        <div>
          <hr className="pt-2" />
          <div>{sort(this.state.books, this.state.value)}</div>
        </div>
      </section>
    );
  }
}

export default Browse;
