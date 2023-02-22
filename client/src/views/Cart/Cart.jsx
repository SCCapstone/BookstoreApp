import { CartProvider, useCart } from "react-use-cart";
import { Grid, Chip, Avatar } from "@mui/material";
import { Button } from "@mui/material";
import books from "../Books";

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
      console.log(books[i]);
      return books[i];
    }
  }
}

const Main_Cart = () => {
  var books_cart = JSON.parse(localStorage.getItem("books_cart"));
  var booksCartNames = JSON.parse(localStorage.getItem("booksCartNames"));
  var bookNames = Object.keys(booksCartNames);

  console.log(books_cart);
  return (
    <div>
      <div>
        <Button onClick={() => clear_cart()}>Clear Cart</Button>
      </div>
      <div className="grid grid-cols-1 grid-flow-row gap-2 sm:max-w-[700px] min-w-[1100px] max-w-[1150px]">
        {Object.keys(booksCartNames).map((bookName) => (
          <div>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <span class="text-center text-2xl px-16">
                  {getBook(books, bookName).name} by{" "}
                  {getBook(books, bookName).author}
                </span>
              </Grid>
              <Grid item xs={4} className={`text-right`}>
                <div class="min-w-[100px] max-w-[190px]">
                  <img
                    src={getBook(books, bookName).image}
                    alt=""
                    className="row-span-2 border-2"
                  />
                </div>
              </Grid>

              <ul className="row-span-6" />
            </Grid>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main_Cart;
