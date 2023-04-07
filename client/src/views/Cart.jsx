import { Component } from "react";
import { Remove, Add } from "@mui/icons-material";
import { Grid, Chip, Avatar } from "@mui/material";
import { Button } from "@mui/material";

// import books from "../Books";
import axios from "axios";
// import { cartChange } from "../../components/NavBar/NavBar";
import { cartChange } from "../components/NavBar/NavBar";
import swal from "sweetalert2";

cartChange();

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
class MainCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      bookCart: [],
      user: {},
      currentUser: "",
    };
  }

  async componentDidMount() {
    // setting books cart
    var bookCart = JSON.parse(localStorage.getItem("book_cart"));
    this.setState((state) => ({
      bookCart: bookCart
    }))

    // check cart
    const bookIds = this.getKeys(bookCart);
    if (this.bookIds?.length <= 0) {
      console.log('THERE ARE NO BOOKS IN CART');
      return;
    }

    // get the books
    const bookUrl = "/api/books/" + bookIds;
    await axios.get(bookUrl).then((res) => {
      let books = res.data;
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
              currentUser: currentUser,
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
  }

  canPurchaseBooks = () => {
    // User cannot purchae if not logged in
    if (!this.state.currentUser || this.state.currentUser.length === 0) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User need to login!",
        footer: "<a href='/login'>Login</a>",
      });
      console.log("USER NEED TO LOGIN");
      return false;
    }

    var updatedBalance = this.availableBalance() - this.calculatePrice();

    // User cannot purchase books if balance is 
    // lower than the cost of the books
    if (updatedBalance < 0) {
      swal.fire({
        icon: "error",
        title: "Not enough balance",
        text: "Please add more to the balance",
      });
      return false;
    } 

    return true;
  };

  async handleSubmit(e) {
    e.preventDefault();

    // canPurchase will store boolean value reflecting
    // if user can purchase books
    if (!this.canPurchaseBooks()) return;

    var order = {
      userId: this.state.user._id,
      order: this.state.bookCart,
      orderPrice: this.calculatePrice(),
      orderDate: new Date(),
      orderStatus: "In-Progress"
    };

    // Step 1: Add new order to orders
    try {
      const orderUrl = "/api/orders";
      axios.post(orderUrl, order).then((res) => {
        // if order successfully went through, empty out cart
        this.clearCart();
      });
    } catch (error) {
      if (error.response?.status >= 400 && error.response.status <= 500) {
        console.log(error.response.data.message);
        swal.fire({
          icon: "error",
          title: "Error adding order",
          text: error.response.data.message,
        });
      }
      return;
    }

    // Step 2: Update Current User's Balance
    var updatedBalance = this.availableBalance() - this.calculatePrice();
    if (updatedBalance === 0) updatedBalance = "0";
    else updatedBalance = round(updatedBalance, 2);
 
    try {
      const url = "/api/users/" + this.state.currentUser;
      const usr = { balance: updatedBalance };
      axios.put(url, usr).then((res) => {
        let tempUser = this.state.user;
        tempUser.balance = Number(updatedBalance);
        this.setState((state) => ({
          user: tempUser,
        }));
      });
    } catch (error) {
      if (error.response?.status >= 400 && error.response.status <= 500) {
        console.log(error.response.data.message);
        swal.fire({
          icon: "error",
          title: "Error updating user balance",
          text: error.response.data.message,
        });
      }
      return;
    }
      
    // Step 3: Update Each Book's Quantity Sold
    for (let bookId in order.order) {
      try {
        const url = "api/books/" + bookId;
        const newBook = {
          quantitySold: order.order[bookId]
        };
        // TO-DO: Update stock as well 
        axios.put(url, newBook).catch((e) => {
          swal.fire({
            icon: "error",
            title: "Error updating book data",
            text: "Quantity of that book sold improperly updated"
          });
        })
      } catch {
        swal.fire({
          icon: "error",
          title: "Error updating book data",
          text: "Quantity of that book sold improperly updated"
        });
      }
    }

    window.location.reload();
  }

  // getting user balance
  availableBalance = () => {
    try {
      if (this.state.user && this.state.user !== 0) {
        let balance = 0;
        if (this.state.user.balance > 0) {
          balance = this.state.user.balance;
        } else if (this.state.user.balance.$numberDecimal !== "") {
          balance = this.state.user.balance.$numberDecimal;
        } 
        return round(balance, 2);
      } else {
        return 0;
      }
    } catch {
      return 0;
    }
  };

  getKeys(obj) {
    var keys = [];
    this.iterate(obj, function (oVal, oKey) {
      keys.push(oKey);
    });
    return keys;
  }
  
  iterate(iterable, callback) {
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

  setQtyValue = ([book, value]) => {
    if (this.checkCartUpdate([book, value])) {
      var tmp = JSON.parse(localStorage.getItem("booksCartNames"));
      tmp[book.title] = value;
      console.log(tmp);
      var tmp2 = this.state.bookCart;
      tmp2[book._id] = value;
      console.log(tmp2);
      localStorage.setItem("booksCartNames", JSON.stringify(tmp));
      localStorage.setItem("book_cart", JSON.stringify(tmp2));
      this.setState((state) => ({
        bookCart: tmp2
      }));
    }
  };

  checkCartUpdate = ([book, value]) => {
    if (book.stock >= value && value >= 0) {
      return true;
    }
    return false;
  };

  removeBookItem = (book) => {
    var tmp = this.state.booksCartNames;
    delete tmp[book.title];
    var tmp2 = this.state.bookCart;
    delete tmp2[book._id];
    localStorage.setItem("booksCartNames", JSON.stringify(tmp));
    localStorage.setItem("book_cart", JSON.stringify(tmp2));
    this.setState((state) => ({
      bookCart: tmp2
    }));
  };

  clearCart = () => {
    localStorage.setItem("book_cart", JSON.stringify({}));
    localStorage.setItem("booksCartNames", JSON.stringify({}));

    // window.location.reload(false);
    this.setState((state) => ({
      bookCart: {}
    }));
  };

  calculatePrice = () => {
    var total = 0;
    for (let i in this.state.bookCart) {
      for (let j = 0; j < this.state.books.length; ++j) {
        if (i === this.state.books[j]._id) {
          total =
            total + this.state.bookCart[i] * this.state.books[j].price;
        }
      }
    }
    return round(total, 2);
  };

  checkOutChecker = () => {
    if (this.calculatePrice() === 0) {
      return true;
    }
    return false;
  };

  mapper = () => {
    let booksSource = [];
    for (let i = 0; i < this.state.books.length; ++i) {
      for (let bookId in this.state.bookCart) {
        if (bookId === this.state.books[i]._id) {
          booksSource.push([
            this.state.books[i],
            this.state.bookCart[bookId],
          ]);
        }
      }
    }
    return booksSource;
  };

  render() {
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
            {this.mapper().map(([book, qty]) => (
              <div
                className={`flex-1 flex justify-start items-center flex-row m-3`}
              >
                <div class="min-w-[80px] max-w-[120px]">
                  <img
                    src={book.imageId}
                    alt=""
                    className="row-span-2 border-2 justify-right"
                  />
                </div>
                <div>
                  <h3 className="font-poppins font-bold xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] ml-3">
                    {book.title} by {book.author}
                  </h3>
                  <h3 className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] ml-3">
                    Price: ${book.price}
                  </h3>
                  <h3 className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] ml-3">
                    Quantity:
                    {qty}
                    <div className="flex pb-2 pt-2">
                      <Chip
                        avatar={
                          <Avatar
                            onClick={() => this.setQtyValue([book, qty - 1])}
                          >
                            <Remove />
                          </Avatar>
                        }
                        label={<p className="px-2 text-lg ">{qty}</p>}
                        clickable
                        onDelete={() => this.setQtyValue([book, qty + 1])}
                        deleteIcon={<Add />}
                      />
                      <button
                        className="pl-4"
                        onClick={() => this.setQtyValue([book, 0])}
                      >
                        Clear
                      </button>
                      <button
                        className="pl-4"
                        onClick={() => this.removeBookItem(book)}
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
            <Button onClick={() => this.clearCart()}>Clear Cart</Button>
          </div>
          <form
            className={`grid grid-cols-3 flex-1 flex justify-start items-center  m-3 bg-camel py-4 px-4 rounded min-w-[500px] max-w-[600px] gap-16`}
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}
          >
            <h4 className="col-span-1 font-poppins font-semibold xs:text-[30.89px] text-[25.89px] xs:leading-[43.16px] leading-[30.16px]">
              Total: ${this.calculatePrice()}
            </h4>
            <button
              class="col-span-2 bg-persian_plum hover:bg-green text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded float-right ml-1"
              type="submit"
              disabled={this.checkOutChecker() ? true : false}
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
