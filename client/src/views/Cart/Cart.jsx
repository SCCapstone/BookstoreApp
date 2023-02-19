import { CartProvider, useCart } from "react-use-cart";
import { Button } from "@mui/material";


function clear_cart(){
  localStorage.setItem("books_cart", JSON.stringify([]));
  window.location.reload(false)
}

const Main_Cart = () => {
  var books_cart = JSON.parse(localStorage.getItem("books_cart"));
  console.log(books_cart);
  

  return (
    <div>
      <div>
        <Button onClick={() => (clear_cart())}>Clear Cart</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-2 sm:max-w-[700px] min-w-[1100px] max-w-[1150px]">
        {books_cart.map((book) => (
          <div
            key={book}
            className="border-2 border-gainsboro hover:border-black"
          >
            <a href={`${book.link}`}>
              <img src={book.image} alt="" className="row-span-2" />
              <div class="text-lg">{book.name}</div>
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
    </div>
  );
};

export default Main_Cart;
