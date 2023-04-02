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
      booksCartNames: [],
      booksCart: [],
      user: {},
      currentUser: "",
    };
  }

  async componentDidMount() {
    // get the books
    const url = "/api/books";
    await axios.get(url).then((res) => {
      let books = res.data;
      // console.log(books);
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

    // setting books cart
    var booksCartNames = JSON.parse(localStorage.getItem("booksCartNames"));
    this.setState((state) => ({
      booksCartNames: booksCartNames,
    }));
    // console.log(this.state);
    // console.log(localStorage.getItem("books_cart"));
  }

  orderSetter = () => {
    var user = {};

    user["firstName"] = this.state.user.firstName;
    user["lastName"] = this.state.user.lastName;
    user["email"] = this.state.user.email;
    user["role"] = this.state.user.role;

    user["order"] = this.state.booksCartNames;
    user["orderPrice"] = this.calculatePrice();
    user["orderDate"] = new Date().toLocaleString();
    user["orderStatus"] = "In-Progress";
    // console.log(user);
    return user;
  };

  purchaseBooks = () => {
    // Is user logged in?
    if (!this.state.currentUser || this.state.currentUser.length === 0) {
      console.log("USER NEED TO LOGIN");
      return false;
    }

    var updatedBalance = this.availableBalance() - this.calculatePrice();

    // console.log(updatedBalance);
    if (updatedBalance < 0) {
      swal.fire({
        icon: "error",
        title: "Not enough balance",
        text: "Please add more to the balance",
      });
      return false;
    } else if (updatedBalance === 0) {
      var tmpUser = this.state.user;
      tmpUser.balance = "0";
      this.setState((state) => ({
        user: tmpUser,
      }));
      // console.log(tmpUser);
    } else {
      var tmpUser = this.state.user;
      // console.log(tmpUser);
      tmpUser.balance = round(
        this.availableBalance() - this.calculatePrice(),
        2
      );
      // console.log(tmpUser);
      this.setState((state) => ({
        user: tmpUser,
      }));
    }
    return true;
  };

  async handleSubmit(e) {
    e.preventDefault();

    var purchase = this.purchaseBooks();
    if (this.state.currentUser && this.state.currentUser.length !== 0) {
      var user = {};

      user["firstName"] = this.state.user.firstName;
      user["lastName"] = this.state.user.lastName;
      user["email"] = this.state.user.email;
      user["role"] = this.state.user.role;

      user["order"] = this.state.booksCartNames;
      user["orderPrice"] = this.calculatePrice();
      user["orderDate"] = new Date().toLocaleString();
      user["orderStatus"] = "In-Progress";
      console.log(user);

      e.preventDefault();

      if (purchase) {
        try {
          const url = "/api/orders";
          axios.post(url, user).then((res) => {
            console.log(res.status);
          });
        } catch (error) {
          if (error.response?.status >= 400 && error.response.status <= 500) {
            console.log(error.response.data.message);
          }
        }
        this.clearCart();
      }

      try {
        const url = "/api/users/" + this.state.currentUser;
        const usr = { balance: this.state.user.balance };
        const res = await axios.put(url, usr);
      } catch (error) {
        if (error.response?.status >= 400 && error.response.status <= 500) {
          console.log(error.response.data.message);
        }
      }
      if (purchase) {
        window.location.reload();
      }
    } else {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User need to login!",
        footer: "<a href='/login'>Login</a>",
      });
    }
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
  };

  getKeys = () => {
    let booksSource = [];

    for (let i = 0; i < this.state.books.length; ++i) {
      for (let book in this.state.booksCartNames) {
        if (book === this.state.books[i].title) {
          booksSource.push([
            this.state.books[i],
            this.state.booksCartNames[book],
          ]);
        }
      }
    }
    return booksSource;
  };

  setQtyValue = ([book, value]) => {
    // console.log([book, value]);
    if (this.checkCartUpdate([book, value])) {
      var tmp = this.state.booksCartNames;
      tmp[book.title] = value;
      console.log(tmp);
      localStorage.setItem("booksCartNames", JSON.stringify(tmp));
      this.setState((state) => ({
        booksCartNames: tmp,
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
    console.log(book);
    var tmp = this.state.booksCartNames;
    delete tmp[book.title];
    console.log(tmp);
    localStorage.setItem("booksCartNames", JSON.stringify(tmp));
    this.setState((state) => ({
      booksCartNames: tmp,
    }));
  };

  clearCart = () => {
    localStorage.setItem("books_cart", JSON.stringify([]));
    localStorage.setItem("booksCartNames", JSON.stringify({}));

    // window.location.reload(false);
    this.setState((state) => ({
      booksCartNames: [],
    }));
  };

  calculatePrice = () => {
    var total = 0;
    for (let i in this.state.booksCartNames) {
      for (let j = 0; j < this.state.books.length; ++j) {
        if (i == this.state.books[j].title) {
          total =
            total + this.state.booksCartNames[i] * this.state.books[j].price;
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