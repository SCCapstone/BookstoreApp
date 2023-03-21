//imports 
import React from "react";
import book_dispensary from "../assets/book_dispensary.jpg";
import { styles } from "../styles";

const Aboutus = () => {
  var books_cart = JSON.parse(localStorage.getItem("books_cart"));
  console.log(books_cart);
  return (
    <section>
      <div class="py-4">
        <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
          About us
        </div>
      </div>
      <div class="xl:ml-20 xl:w-8/12 lg:w-8/12 md:w-4/12 w-4/12 py-2 grid grid-rows-auto max-w-[1400px]">
        <p className={`${styles.paragraph} max-w-[1158px]`}>
          The Book Dispensary is a local, family owned business that began life
          December 2, 1975 in Columbia's St. Andrews area, near the intersection
          of Bush River Road and I-126 in what was then Boardwalk Plaza Shopping
          Center. For nearly 40 years we have been providing the people of
          Columbia and central South Carolina as well as people from all over
          the rest of the US and many other parts of the world with everything
          from paperbacks to world class collectible books and maps. This
          website has been refurbished so that both employees and customers can
          use this site.
        </p>
        <img
          src={book_dispensary}
          alt="Book Dispensary"
          className="row-span-2"
        />
        <p className={`${styles.paragraph}`}>
          Location to Visit Us: 710-C Gracern Rd, Columbia, SC 29210
        </p>
      </div>
    </section>
  );
};

export default Aboutus;
