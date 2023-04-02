import { CartProvider, useCart } from "react-use-cart";
import { React, useState, useEffect, Component } from "react";
import { Remove, Add, Javascript } from "@mui/icons-material";
import { Grid, Chip, Avatar } from "@mui/material";
import { Button } from "@mui/material";

// import books from "../Books";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cartChange } from "../../components/NavBar/NavBar";
import swal from "sweetalert2";

cartChange();

function clear_cart() {
  localStorage.setItem("books_cart", JSON.stringify([]));
  localStorage.setItem("booksCartNames", JSON.stringify({}));

  window.location.reload(false);
}
function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
class MainCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      booksCartNames: [],
      booksCart: [],
      user: {},
    };
  }

  async componentDidMount() {
    // get the books
    const url = "/api/books";
    await axios.get(url).then((res) => {
      let books = res.data;
      console.log(books);
      this.setState((state) => ({
        books: books,
      }));
    });

    // user login
    try {
      const currentUser = localStorage.getItem("userID");
      // console.log(currentUser);
      if (currentUser && currentUser != null) {
        const userURL = "/api/users/" + localStorage.getItem("userID");

        await axios.get(userURL).then(async (res) => {
          if (res.status === 200) {
            let user = res.data;
            // console.log(user);
            await this.setState((state) => ({
              user: user,
            }));
            // console.log(this.state.user);
          }
        });
      } else {
        console.log("USER NEED TO LOGIN");
      }
    } catch (error) {
      console.log("USER NEED TO LOGIN");
    }

    // setting books cart
    var booksCartNames = JSON.parse(localStorage.getItem("booksCartNames"));
    this.setState((state) => ({
      booksCartNames: booksCartNames,
    }));
    // console.log(this.state);
  }

  updateIteration = () => {
    this.setState((state) => ({
      booksCartNames: JSON.parse(localStorage.getItem("booksCartNames")),
    }));
  };

  // getting user balance
  availableBalance = () => {
    try {
      if (this.state.user && this.state.user !== 0) {
        return round(this.state.user.balance.$numberDecimal, 2);
      } else {
        return 0;
      }
    } catch {
      return 0;
    }
    // console.log(this.state.user);
  };

  getKeys = () => {
    let booksSource = [];

    for (let i = 0; i < this.state.books.length; ++i) {
      for (let book in this.state.booksCartNames) {
        if (book === this.state.books[i].title) {
          // console.log(book);
          booksSource.push([
            this.state.books[i],
            this.state.booksCartNames[book],
          ]);
        }
        // console.log(book);
      }
    }
    console.log(booksSource);
    return booksSource;
    // return this.state.books;
  };

  // purchaseBooks = () => {
  //   if (currentUser && currentUser.length !== 0) {
  //     if (currentBalance - calculatePrice(books, booksCartNames) >= 0) {
  //       if (currentBalance - calculatePrice(books, booksCartNames) === 0) {
  //         data.balance = "0";
  //       } else {
  //         data.balance = round(
  //           currentBalance - calculatePrice(books, booksCartNames),
  //           2
  //         );
  //       }
  //       orderSetter();
  //       console.log(userData(allUsers, currentUser));
  //       localStorage.setItem("books_cart", JSON.stringify([]));
  //       localStorage.setItem("booksCartNames", JSON.stringify({}));
  //       handleChange();
  //     } else {
  //       handleChange();
  //       window.location.reload();
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // };


  render() {
    // this.updateIteration();
    return (
      <div class="py-6 bg-gainsboro">
        <Grid item xs={12}>
          <span class="text-center text-3xl px-16 py-6 mt-10">
            Available balance: ${this.availableBalance()}
          </span>
        </Grid>
        <div className="grid grid-cols-1 grid-flow-row min-w-[1100px] max-w-screen">
          <div
            className={`flex justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 flex-row flex-wrap sm:mb-20 mb-6`}
          >
            {this.getKeys().map(([book, qty]) => (
              <div
                className={`flex-1 flex justify-start items-center flex-row m-3`}
              >
                <div class="min-w-[80px] max-w-[120px]">
                  <img
                    // src={getBook(books, bookName).imageId}
                    src={book.imageId}
                    alt=""
                    className="row-span-2 border-2 justify-right"
                  />
                </div>
                <div>
                  <h3 className="font-poppins font-bold xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] ml-3">
                    {/* {getBook(books, bookName).title} by{" "}
                    {getBook(books, bookName).author} */}
                  </h3>
                  <h3 className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] ml-3">
                    Price: ${/* {getBook(books, bookName).price} */}
                  </h3>
                  <h3 className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] ml-3">
                    Quantity:
                    {qty}
                    <div className="flex pb-2 pt-2">
                      <Chip
                        avatar={
                          <Avatar
                          // onClick={() => subtract(booksCartNames, bookName)}
                          >
                            <Remove />
                          </Avatar>
                        }
                        label={
                          <p className="px-2 text-lg ">
                            {/* {quantity[bookName]} */}
                          </p>
                        }
                        clickable
                        // onDelete={() => add(booksCartNames, bookName)}
                        deleteIcon={<Add />}
                      />
                      <button
                        className="pl-4"
                        // onClick={() => setZero(booksCartNames, bookName)}
                      >
                        Clear
                      </button>
                      <button
                        className="pl-4"
                        // onClick={() => deleteItem(booksCartNames, bookName)}
                      >
                        Delete
                      </button>
                    </div>
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <div className="ml-2">
            {/* <Button onClick={() => clear_cart()}>Clear Cart</Button> */}
          </div>
          <form
            className={`grid grid-cols-3 flex-1 flex justify-start items-center  m-3 bg-camel py-4 px-4 rounded min-w-[500px] max-w-[600px] gap-16`}
            // onSubmit={(e) => {
            //   handleSubmit(e);
            //   handleSubmitOrder(e);
            // }}
          >
            <h4 className="col-span-1 font-poppins font-semibold xs:text-[30.89px] text-[25.89px] xs:leading-[43.16px] leading-[30.16px]">
              Total: ${/* {calculatePrice(books, booksCartNames)} */}
            </h4>
            <button
              class="col-span-2 bg-persian_plum hover:bg-green text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded float-right ml-1"
              // onClick={() => {
              //   purchaseBooks(currentUser);
              // }}
              type="submit"
            >
              Check out
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default MainCart;
