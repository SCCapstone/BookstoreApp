import { React, useState } from "react";
import ReactStars from "react-stars";
import Heart from "react-heart";
import { Grid, Chip, Avatar } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import Popup from "reactjs-popup";
import swal from "sweetalert2";

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

const BooksPageGenerator = ({ book }) => {
  const [quantity, setQuantity] = useState(1);

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
    // console.log(books_cart);

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
    swal.fire({
      icon: "success",
      title: "Book added to cart",
    });
    console.log(booksCartNames);
    console.log(booksCartNames);
  }

  function add(quantity) {
    setQuantity(quantity + 1);
  }

  function subtract(quantity) {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  const [active, setActive] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <span class="text-center text-3xl px-16 py-3">
          {book.title} by {book.author}
        </span>
      </Grid>
      <Grid item xs={4} className={`text-right`}>
        <div class="min-w-[100px] max-w-[190px]">
          <img src={book.imageId} alt="" className="row-span-2 border-2" />
        </div>
      </Grid>
      <Grid item xs={8}>
        <ul className="text-bold text-xl">{book.price}</ul>
        <ReactStars
          count={5}
          value={book.stars}
          size={24}
          edit={false}
          color1={"#000"}
          color2={"#c2b542"}
        />
        <ul>Quantity Available: {book.stock}+</ul>
        <ul className="flex">
          Add to Wishlist: &nbsp;
          <span className="py-1">
            <Heart
              style={{ width: "20px" }}
              isActive={active}
              onClick={() => setActive(!active)}
              activeColor={"#404252"}
            />
          </span>
        </ul>
        <u>
          <a href="/">Check availability in stores near you</a>
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
            {" "}
            Clear{" "}
          </button>
        </div>

        <div class="flex mb-6">
          <button
            class="text-slate-800 font-semibold hover:text-black focus:text-black active:bg-green focus:bg-green bg-polished_pine rounded p-3 border-2 mr-3 min-w-[138px] max-w-[150px]"
            onClick={() => addItem(book, quantity)}
          >
            Add to cart
          </button>

          {/* <button class="text-slate-800 font-semibold focus:text-black focus:bg-persian_plum rounded p-3 border-2 max-w-[150px]">
            Instant Purchase
          </button> */}
        </div>
        <ul className="row-span-6" />
      </Grid>
    </Grid>
  );
};

export default BooksPageGenerator;

/*
 
    {
    name: "How Easy is That?",
    author: "Ina Garten",
    image: require("./Books/howeasyisthat.png"),
    review:
      "HET A genius book about an incredible mind, yadda yadda blah blah blah lots of gushing and awing because I like books.",
    link: "/Ina Garten/How Easy is That",
    },
  
*/
