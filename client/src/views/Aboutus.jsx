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
          The Bugsy's Barn Books was invented by a group of University of South Carolina students
          on August 21, 2022 on campus. After the COVID pandemic, many people lost interest in reading
          or have stopped reading all together unless it pertains to their courses or for their jobs. 
          As such, we felt that it would be nice and encouraging for people to get back into the habit 
          to read for fun. We decided to create a web platform where people of all ages can purchase 
          books for cheap from our custom bookstore. We provide all kinds of books in many different
          genres so people have a wide variety of choices depending on their mood and interests.
        </p>
        <img
          src={book_dispensary}
          alt="Book Dispensary"
          className="row-span-2"
        />
        {/*Location of the Book Dispensary */}
        <p className={`${styles.paragraph}`}>
          Location to Visit Us: 123 UniversitySC Ave, Columbia, SC 29210
        </p>
      </div>
    </section>
  );
};

export default Aboutus;
