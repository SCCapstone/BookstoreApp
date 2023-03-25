import React from "react";
import book_dispensary from "../assets/book_dispensary.jpg"; //picture of the book dispensary - found off the internet
import { styles } from "../styles";

const Aboutus = () => {
  var books_cart = JSON.parse(localStorage.getItem("books_cart")); //gets the book from the local storage and stores it as an item in the books cart to show the item type and number of items (in this case item: book) in the cart
  console.log(books_cart); //outputs what's in the books cart to the console (when running the file use inspect element and go to console to see this when clicking the cart)
  return (
    //About Us Block
    <section>
      <div class="py-4">
        <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
          About us
        </div>
      </div>
      {/*paragraph block with a description of what the Book Dispensary is and what it has to offer*/}
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
        {/*Location of the Book Dispensary */}
        <p className={`${styles.paragraph}`}>
          Location to Visit Us: 710-C Gracern Rd, Columbia, SC 29210
        </p>
      </div>
    </section>
  );
};

export default Aboutus;
