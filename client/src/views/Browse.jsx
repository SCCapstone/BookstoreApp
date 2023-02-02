import { useState } from "react";
import { styles } from "../styles";
import books from "./Books";



const sort = (books, value) => {
  var books_changed = [];
  if(value == 1) {
    books_changed = books;
    console.log(value)
  }
  else if(value == 2){
    books_changed = books.sort(function(a, b){return b.sold - a.sold});
  }
  else if(value == 3){
    books_changed = books.sort(function(a, b){return new Date(b.date) - new Date(a.date)});
  }
  else if(value == 4){
    books_changed = books.sort(function(a, b){return a.price - b.price});
  }
  else if(value == 5){
    books_changed = books.sort(function(a, b){return b.price - a.price});
  }
  else {
    books_changed = [];
  }

  return (
    <div className="grid grid-cols-4 grid-flow-row gap-2">
      {books_changed.map((book) => (
        <div
          key={book}
          className="border-2 border-gainsboro hover:border-black"
        >
          <a href={`${book.link}`}>
            <img src={book.image} alt="" className="row-span-2" />
            <div class=" ">{book.name}</div>
            <div class="felx items-end">by: {book.author}</div>
          </a>
        </div>
      ))}
    </div>
  );
};

const Browse = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value);
  };
  



  return (
    <section className="">
      <div class="py-4">
        <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
          Browse
        </div>
      </div>
      <div class="xl:ml-20 xl:w-8/12 lg:w-8/12 md:w-4/12 w-4/12 py-2 grid max-w-[1158px]">
        <p className={`${styles.paragraph} max-w-[1158px] relative grid`}>
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
            className="w-[1100px] py-2 pl-10 border rounded"
            placeholder="Search Books"
          />
        </p>
        <label for="cars">Sort by:</label>

        <select
          name="cars"
          id="cars"
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="1">Relevant</option>
          <option value="2">Best Selling</option>
          <option value="3">New Arrivals</option>
          <option value="4">Price: low to high</option>
          <option value="5">Price: high to low</option>
          <option value="6">Qty: low to high</option>
          <option value="7">Qty: high to low</option>
        </select>

        <hr className="pt-2" />
        <div>{sort(books, value)}</div>
      </div>
    </section>
  );
};

export default Browse;
