import { CartProvider, useCart } from "react-use-cart";
import { React, useState } from "react";
import { Remove, Add } from "@mui/icons-material";
import { Grid, Chip, Avatar } from "@mui/material";
import { Button } from "@mui/material";
import books from "../Books";
import { useNavigate } from "react-router-dom";

function clear_cart() {
  localStorage.setItem("books_cart", JSON.stringify([]));
  localStorage.setItem("booksCartNames", JSON.stringify({}));
  window.location.reload(false);
}

function addItem(book) {
  var books_cart = JSON.parse(localStorage.getItem("books_cart"));
  if (books_cart == null) {
    books_cart = [];
  }

  var booksCartNames = JSON.parse(localStorage.getItem("booksCartNames"));
  if (booksCartNames == null) {
    booksCartNames = [];
  }
  booksCartNames.push(book.name);

  booksCartNames = booksCartNames.reduce(function (prev, cur) {
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});

  books_cart.push(book);
  localStorage.setItem("books_cart", JSON.stringify(books_cart));
  localStorage.setItem("booksCartNames", JSON.stringify(booksCartNames));
  console.log(booksCartNames);
}

function getBook(books, bookName) {
  for (let i = 0; i < books.length; ++i) {
    if (books[i].name == bookName) {
      return books[i];
    }
  }
}

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

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

function calculatePrice(books, booksCartNames) {
  let finalPrice = 0;
  var bookNames = getKeys(booksCartNames);
  for (let i = 0; i < bookNames.length; ++i) {
    finalPrice =
      finalPrice +
      booksCartNames[bookNames[i]] * getBook(books, bookNames[i]).price;
  }

  return round(finalPrice, 2);
}

const MainCart = ({ currentUser }) => {
  const navigate = useNavigate();
  var booksCartNames = JSON.parse(localStorage.getItem("booksCartNames"));

  var puchaseBooks = (currentUser) => {
    if (currentUser && currentUser.length !== 0) {
      // localStorage.removeItem("token");
      localStorage.setItem("books_cart", JSON.stringify([]));
      localStorage.setItem("booksCartNames", JSON.stringify({}));
      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  //   {
  //     "Steve Jobs": 22,
  //     "Go-To-Dinners": 13
  // };

  const [quantity, setQuantity] = useState(booksCartNames);
  function add(booksCartNames, bookName) {
    console.log("adding");
    booksCartNames[bookName] = booksCartNames[bookName] + 1;
    setQuantity(booksCartNames);
    localStorage.setItem("booksCartNames", JSON.stringify(booksCartNames));
    window.location.reload();
  }

  function subtract(booksCartNames, bookName) {
    console.log("subing");
    if (quantity[bookName] > 0) {
      booksCartNames[bookName] = booksCartNames[bookName] - 1;
      setQuantity(booksCartNames);
      localStorage.setItem("booksCartNames", JSON.stringify(booksCartNames));
      window.location.reload();
    }
  }

  function setZero(booksCartNames, bookName) {
    booksCartNames[bookName] = 0;
    setQuantity(booksCartNames);
    localStorage.setItem("booksCartNames", JSON.stringify(booksCartNames));
    window.location.reload();
  }

  // console.log(books_cart);
  return (
    <div>
      <div>
        <Button onClick={() => clear_cart()}>Clear Cart</Button>
      </div>
      <div className="grid grid-cols-1 grid-flow-row min-w-[1100px] max-w-screen">
        {/* {Object.keys(booksCartNames).map((bookName) => ( */}
        {/* <div>
            <div class="grid grid-cols-2 gap-2 p-5 bg-black">
                <Grid item xs={4} className={`object-right w-2/4 bg-green`}>
                  <div class="min-w-[100px] max-w-[190px]">
                    <img
                      src={getBook(books, bookName).image}
                      alt=""
                      className="row-span-2 border-2 justify-right"
                    />
                  </div>
                </Grid>
              <div class="bg-red text-green-500 text-lg font-bold text-center rounded-lg w-fit mr-12">
                <Grid item xs={12}>
                  <span class="text-center text-2xl px-16 ">
                    {getBook(books, bookName).name} by{" "}
                    {getBook(books, bookName).author}
                  </span>
                </Grid>
              </div>
            </div>

            <Grid container spacing={2}>
              <ul className="row-span-6" />
            </Grid>
          </div> */}
        <div
          className={`flex justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 flex-row flex-wrap sm:mb-20 mb-6`}
        >
          {getKeys(booksCartNames).map((bookName) => (
            <div
              className={`flex-1 flex justify-start items-center flex-row m-3`}
            >
              <div class="min-w-[80px] max-w-[120px]">
                <img
                  src={getBook(books, bookName).image}
                  alt=""
                  className="row-span-2 border-2 justify-right"
                />
              </div>
              <div>
                <h3 className="font-poppins font-bold xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] ml-3">
                  {getBook(books, bookName).name} by{" "}
                  {getBook(books, bookName).author}
                </h3>
                <h3 className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] ml-3">
                  Price: ${getBook(books, bookName).price}
                </h3>
                <h3 className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] ml-3">
                  Quantity: {booksCartNames[bookName]}
                  <div className="flex pb-2 pt-2">
                    <Chip
                      avatar={
                        <Avatar
                          onClick={() => subtract(booksCartNames, bookName)}
                        >
                          <Remove />
                        </Avatar>
                      }
                      label={
                        <p className="px-2 text-lg ">{quantity[bookName]}</p>
                      }
                      clickable
                      onDelete={() => add(booksCartNames, bookName)}
                      deleteIcon={<Add />}
                    />
                    <button
                      className="pl-4"
                      onClick={() => setZero(booksCartNames, bookName)}
                    >
                      {" "}
                      Clear{" "}
                    </button>
                  </div>
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`grid grid-cols-3 flex-1 flex justify-start items-center  m-3 bg-camel py-4 px-4 rounded min-w-[500px] max-w-[600px] gap-16`}
        >
          <h4 className="col-span-1 font-poppins font-semibold xs:text-[30.89px] text-[25.89px] xs:leading-[43.16px] leading-[30.16px]">
            Total: ${calculatePrice(books, booksCartNames)}
          </h4>
          <button
            class="col-span-2 bg-persian_plum hover:bg-green text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded float-right ml-1"
            onClick={() => {
              puchaseBooks(currentUser);
            }}
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainCart;