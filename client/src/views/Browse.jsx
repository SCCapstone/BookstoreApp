import { styles } from "../styles";
import books from "./Books";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { React, useState, useEffect } from "react";

const decimalNumber = (price) => {
  var result = price - Math.floor(price) !== 0;
  if (result) {
    price = price.toString();
    price = price.slice(price.indexOf(".") + 1, price.length);
    return Number(price);
  } else {
    return;
  }
};

const wholeNumber = (price) => {
  price = price.toString();
  price = price.slice(0, price.indexOf("."));
  return Number(price);
};

const sort = (books, selection) => {
  var books_changed = [];

  switch (selection) {
    case "Relavent":
      books_changed = books;
      break;
    case "Best Selling":
      books_changed = books.sort(function (a, b) {
        return b.quantitySold - a.quantitySold;
      });
      break;
    case "New Arrivals":
      books_changed = books.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      break;
    case "Price: low to high":
      books_changed = books.sort(function (a, b) {
        return a.price - b.price;
      });
      break;
    case "Price: high to low":
      books_changed = books.sort(function (a, b) {
        return b.price - a.price;
      });
      break;
    default:
      books_changed = books;
      break;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-2 sm:max-w-[700px] min-w-[1100px] max-w-[1150px]">
      {books_changed.map((book) => (

        <div
          key={book}
          className="border-2 border-gainsboro hover:border-black"
        >
          <a href={`${book.title}`}>
            <img src={require('./default.jpg')} alt="" className="row-span-2" />
            <div class="text-lg">{book.title}</div>
            <div class="felx items-end">by: {book.author}</div>
            {/*<div class="text-lg">
              ${wholeNumber(book.price)}.
              <span className="text-sm">{decimalNumber(book.price)}</span>
      </div>*/}
            <div>${book.price}</div>
          </a>
        </div>
      ))}
    </div>
  );
};

const Browse = () => {
  const [books, setBooks] = useState([]);
  const fetchBooks = () => {
    return fetch("/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  // localStorage.setItem("books", JSON.stringify(books));
  console.log(books);

  const [value, setValue] = useState("");

  const book_instance = localStorage.getItem("Book");

  function changeOption(option) {
    setValue(option);
    localStorage.setItem("option", option);
  }

  let prevOption = localStorage.getItem("option");


  return (
    <section className="sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1150px] xl:max-w-[1200px] max-w-[200px]">
      <div class="py-4">
        <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
          Browse
        </div>
      </div>

      <div class=" xl:w-8/12 lg:w-8/12 md:w-4/12 w-4/12 py-2 grid">
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
      </div>
      <div class="flex pb-2">
        <select
          className="rounded border bg-white py-2 grid max-w-[1158px] px-4 w-[500px] xl:w-[1100px] lg:w-[600px] md:w-[500px]"
          onChange={(e) => changeOption(e.target.value)}
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
        <div>{sort(books, value)}</div>
      </div>
    </section>
  );
};

export default Browse;
