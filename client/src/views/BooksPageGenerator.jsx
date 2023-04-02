import React, { useState } from "react";
import ReactStars from "react-stars";
import Heart from "react-heart";
import { Chip, Avatar } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import Popup from "reactjs-popup";
import swal from "sweetalert2";
import axios from "axios";

function getKeys(obj) {
  var keys = [];
  iterate(obj, function (oVal, oKey) {
    keys.push(oKey);
  });
  return keys;
}
function iterate(iterable, callback) {
  for (var key in iterable) {
    if (
      key === "length" ||
      key === "prototype" ||
      !Object.prototype.hasOwnProperty.call(iterable, key)
    )
      continue;
    callback(iterable[key], key, iterable);
  }
}

const BooksPageGenerator = ({ book, user }) => {

  const [quantity, setQuantity] = useState(0);

  function addItem(book, quantity) {
    var books_cart = JSON.parse(localStorage.getItem("books_cart"));
    if (books_cart == null) {
      books_cart = [];
      localStorage.setItem("books_cart", JSON.stringify([]));
      localStorage.setItem("booksCartNames", JSON.stringify({}));
    }
    for (let i = 0; i < quantity; i++) {
      books_cart.push(book);
    }

    localStorage.setItem("books_cart", JSON.stringify(books_cart));

    var booksCartNames = JSON.parse(localStorage.getItem("booksCartNames"));
    var bookNames = getKeys(booksCartNames);

    if (booksCartNames == null) {
      booksCartNames = [];
    }

    if (
      bookNames.includes(book.title) !== null &&
      !bookNames.includes(book.title)
    ) {
      booksCartNames[book.title] = 0;
    }

    booksCartNames[book.title] = booksCartNames[book.title] + quantity;
    localStorage.setItem("booksCartNames", JSON.stringify(booksCartNames));
    window.location.reload(false);
  }

  function add(qty) {
    var books = JSON.parse(localStorage.getItem("booksCartNames"));
    if (
      book.stock - books[book.title] > qty ||
      (!books[book.title] && book.stock - quantity > 0)
    ) {
      setQuantity(qty + 1);
    }
  }

  function subtract(quantity) {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  function countBookQuantity() {
    var books = JSON.parse(localStorage.getItem("booksCartNames"));
    return book.stock - books[book.title];
  }

  const [active, setActive] = useState(false);

  React.useEffect(() => {
    const url = "/api/users/" +  user;
    axios.get(url).then((response) => {
      const userFavs =  response.data.favorites;
      const isActive = userFavs.includes(book._id);
      setActive(isActive);
    });
  }, []);

  function addOrRemoveFromWishlist() {
    // don't do anything if not logged-in
    if (!user || user.length === 0) return;

    const url = "/api/users/" +  user;
    const tempUser = {
      favorites: book._id
    }

    if (active) { // deleting from wishlist
      axios.put(url, tempUser).then(res => {
        if (res.status === 200) {
            swal.fire({
                icon: 'success',
                title: 'Successfully Removed from wishlist'
            });    
        }
      });
    } else { // adding to wishlist
      axios.put(url, tempUser).then(res => {
        if (res.status === 200) {
            swal.fire({
                icon: 'success',
                title: 'Successfully Added to Wishlist'
            });    
        }
      });
    }
    setActive(!active);
  }

  return (
    <section class="grid grid-cols-5 max-w-[1300px]">
      <div />
      <div className="py-4 col-span-3">
        <div class="grid text-center text-black text-3xl py-3 max-w-[1300px]">
          {book.title} by {book.author}
        </div>
        <div className="grid grid-cols-2 ">
          <div className="px-16 py-8">
            <img src={book.imageId} alt="" className="row-span-2 border-2" />
          </div>
          <div className="pt-12 grid grid-auto-rows">
            <ul className="text-bold text-xl">${book.price}</ul>
            <ReactStars
              count={5}
              value={book.stars}
              size={24}
              edit={false}
              color1={"#000"}
              color2={"#c2b542"}
            />

            <ul>Quantity Available: {book.stock}</ul>
            <ul className="flex">
              Add to Wishlist: &nbsp;
              <span className="py-1">
                <Heart
                  style={{ width: "20px" }}
                  isActive={active}
                  onClick={() => addOrRemoveFromWishlist()}
                  activeColor={"#70161E"}
                />
              </span>
            </ul>
            <u>
              <a href={`/${book.author}/${book.title}/reviews`}>
                View Reviews of the Book here!
              </a>
            </u>

            <div className="flex pb-2 pt-2">
              <Chip
                avatar={
                  <Avatar onClick={() => subtract(quantity)}>
                    <Remove />
                  </Avatar>
                }
                label={<p className="px-2 text-lg ">{quantity}</p>}
                clickable
                onDelete={() => add(quantity)}
                deleteIcon={<Add />}
              />
              <button className="pl-4" onClick={() => setQuantity(0)}>
                Clear
              </button>
            </div>

            <div class="flex mb-6">
              <button
                class="text-slate-800 font-semibold hover:text-black focus:text-black active:bg-green focus:bg-green bg-polished_pine rounded p-3 border-2 mr-3 min-w-[138px] max-w-[150px]"
                onClick={() => addItem(book, quantity)}
              >
                Add to cart
              </button>
            </div>
            <ul className="row-span-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksPageGenerator;
