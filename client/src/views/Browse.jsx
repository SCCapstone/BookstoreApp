import { React } from "react";
import { styles } from "../styles";

const books = [
  {
    name: "Steve Jobs",
    author: "Walter Issacson",
    image: require("./Books/stevejobs.png"),
  },
  {
    name: "Go-To-Dinners",
    author: "Ina Garten",
    image: require("./Books/gotodinners.png"),
  },
  {
    name: "How Easy is That?",
    author: "Ina Garten",
    image: require("./Books/howeasyisthat.png"),
  },
  {
    name: "Jane Eyre",
    author: "Charlotte Bronte",
    image: require("./Books/janeeyre.png"),
  },
  {
    name: "Steve Jobs",
    author: "Walter Issacson",
    image: require("./Books/stevejobs.png"),
  },
  {
    name: "Go-To-Dinners",
    author: "Ina Garten",
    image: require("./Books/gotodinners.png"),
  },
  {
    name: "How Easy is That?",
    author: "Ina Garten",
    image: require("./Books/howeasyisthat.png"),
  },
  {
    name: "Jane Eyre",
    author: "Charlotte Bronte",
    image: require("./Books/janeeyre.png"),
  },
  // { name: "The Escape Artist", author: "Chris Schluep", image: require("./Books/") },
];

const Browse = () => {
  return (
    <section className="">
      <div class="py-4">
        <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
          Browse
        </div>
      </div>
      <div class="xl:ml-20 xl:w-8/12 lg:w-8/12 md:w-4/12 w-4/12 py-2 grid max-w-[1158px]">
        <p className={`${styles.paragraph} max-w-[1158px]`}>
          Search
          __________________________________________________________________________________________________________________________________
        </p>
        <div className="grid grid-cols-4 grid-flow-row gap-2">
          {books.map((book) => (
            <div key={book}>
              <span>
                <img src={book.image} alt="" className="row-span-2" />
                <div class=" ">{book.name}</div>
                <div class="felx items-end">by: {book.author}</div>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Browse;
