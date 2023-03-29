import { CartProvider, useCart } from "react-use-cart";
import { React, useState, useEffect } from "react";
import { Remove, Add } from "@mui/icons-material";
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

function addItem(book) {
  var books_cart = JSON.parse(localStorage.getItem("books_cart"));
  if (books_cart == null) {
    books_cart = [];
  }

  var booksCartNames = JSON.parse(localStorage.getItem("booksCartNames"));
  if (booksCartNames == null) {
    booksCartNames = [];
  }
  booksCartNames.push(book.title);

  booksCartNames = booksCartNames.reduce(function (prev, cur) {
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});

  books_cart.push(book);
  localStorage.setItem("books_cart", JSON.stringify(books_cart));
  localStorage.setItem("booksCartNames", JSON.stringify(booksCartNames));
}

function getBook(books, bookName) {
  for (let i = 0; i < books.length; ++i) {
    if (books[i].title == bookName) {
      // console.log(books[i]);
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
    // window.location.reload();
    keys.push(oKey);
  });
  return keys;
}
function iterate(iterable, callback) {
  for (var key in iterable) {
    if (
      key === "length" ||
      // window.location.reload();
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
  // const [books, setBooks] = useState([]);
  // setBooks(localStorage.getItem("books"))
  const books = JSON.parse(localStorage.getItem("books"));

  // console.log(books)
  const navigate = useNavigate();
  var booksCartNames = JSON.parse(localStorage.getItem("booksCartNames"));
  localStorage.setItem("cartItemsQuantity", findQuantity(booksCartNames));

  const [quantity, setQuantity] = useState(booksCartNames);

  // console.log(booksCartNames);

  function findQuantity(booksCartNames) {
    let count = 0;
    for (var key in booksCartNames) count = count + booksCartNames[key];
    return count;
  }

  function add(booksCartNames, bookName) {
    booksCartNames[bookName] = booksCartNames[bookName] + 1;
    setQuantity(booksCartNames);
    localStorage.setItem("booksCartNames", JSON.stringify(booksCartNames));
    window.location.reload();
  }

  function subtract(booksCartNames, bookName) {
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

  function deleteItem(booksCartNames, bookName) {
    delete booksCartNames[bookName];
    setQuantity(booksCartNames);
    localStorage.setItem("booksCartNames", JSON.stringify(booksCartNames));
    window.location.reload();
  }

  const getUserData = async () => {
    const url = "/api/users/" + currentUser;
    const res = await axios.get(url, data);
    return res.data;
  };

  const [data, setData] = useState(getUserData);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/users/" + currentUser;
      if (data.password === "") {
        delete data.password;
      }
      const res = await axios.put(url, data);
      window.location.reload();
    } catch (error) {
      if (error.response?.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  function ValidatedUsers(props) {
    const [currentUser, setCurrentUser] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
      async function getValidatedUsers() {
        const url = "/api/users";
        const res = await axios.get(url);
        const users = res.data;
        setCurrentUser(props.currentUser);
        setUsers(users);
      }
      getValidatedUsers();
    }, [props.currentUser]);
    return users;
  }

  function userData(users, currentUser) {
    for (let i = 0; i < users.length; ++i) {
      if (users[i]._id === currentUser) {
        return round(users[i].balance.$numberDecimal, 2);
      }
    }
  }
  var allUsers;
  var currentBalance;
  if (currentUser && currentUser.length !== 0) {
    allUsers = ValidatedUsers(currentUser);
    currentBalance = userData(allUsers, currentUser);
  }

  function userInfo(users, currentUser) {
    for (let i = 0; i < users.length; ++i) {
      if (users[i]._id === currentUser) {
        return users[i];
      }
    }
  }

  const handleSubmitOrder = async (e) => {
    if (currentBalance - calculatePrice(books, booksCartNames) >= 0) {
      e.preventDefault();
      try {
        const url = "/api/orders";
        axios.post(url, orderSetter()).then((res) => {
          console.log(res.status);
        });
      } catch (error) {
        if (error.response?.status >= 400 && error.response.status <= 500) {
          setError(error.response.data.message);
        }
      }
    }
  };

  const [userBalance, setUserBalance] = useState(0);

  const availableBalance = () => {
    if (currentUser && currentUser.length !== 0) {
      var allUsers = ValidatedUsers(currentUser);
      var tmp = userData(allUsers, currentUser);
      return tmp;
    }
    return 0;
  };

  function orderSetter() {
    var user = {};
    for (let i = 0; i < allUsers.length; ++i) {
      if (allUsers[i]._id === currentUser) {
        user["firstName"] = allUsers[i].firstName;
        user["lastName"] = allUsers[i].lastName;
        user["email"] = allUsers[i].email;
        user["role"] = allUsers[i].role;
      }
    }
    user["order"] = booksCartNames;
    user["orderPrice"] = calculatePrice(books, booksCartNames);
    user["orderDate"] = new Date().toLocaleString();
    user["orderStatus"] = "In-Progress"
    console.log(user);
    return user;
  }

  var puchaseBooks = (currentUser) => {
    if (currentUser && currentUser.length !== 0) {
      if (currentBalance - calculatePrice(books, booksCartNames) >= 0) {
        if (currentBalance - calculatePrice(books, booksCartNames) === 0) {
          data.balance = "0";
        } else {
          data.balance = round(
            currentBalance - calculatePrice(books, booksCartNames),
            2
          );
        }
        orderSetter();
        console.log(userData(allUsers, currentUser));
        localStorage.setItem("books_cart", JSON.stringify([]));
        localStorage.setItem("booksCartNames", JSON.stringify({}));
        handleChange();
      } else {
        handleChange();
        window.location.reload();
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div class="py-6">
      <Grid item xs={12}>
        <span class="text-center text-3xl px-16 py-6 mt-10">
          Available balance: ${availableBalance()}
        </span>
      </Grid>
      <div className="grid grid-cols-1 grid-flow-row min-w-[1100px] max-w-screen">
        <div
          className={`flex justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 flex-row flex-wrap sm:mb-20 mb-6`}
        >
          {getKeys(booksCartNames).map((bookName) => (
            <div
              className={`flex-1 flex justify-start items-center flex-row m-3`}
            >
              <div class="min-w-[80px] max-w-[120px]">
                <img
                  src={getBook(books, bookName).imageId}
                  alt=""
                  className="row-span-2 border-2 justify-right"
                />
              </div>
              <div>
                <h3 className="font-poppins font-bold xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] ml-3">
                  {getBook(books, bookName).title} by{" "}
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
                      Clear
                    </button>
                    <button
                      className="pl-4"
                      onClick={() => deleteItem(booksCartNames, bookName)}
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
          <Button onClick={() => clear_cart()}>Clear Cart</Button>
        </div>
        <form
          className={`grid grid-cols-3 flex-1 flex justify-start items-center  m-3 bg-camel py-4 px-4 rounded min-w-[500px] max-w-[600px] gap-16`}
          onSubmit={(e) => {
            handleSubmit(e);
            handleSubmitOrder(e);
          }}
        >
          <h4 className="col-span-1 font-poppins font-semibold xs:text-[30.89px] text-[25.89px] xs:leading-[43.16px] leading-[30.16px]">
            Total: ${calculatePrice(books, booksCartNames)}
          </h4>
          <button
            class="col-span-2 bg-persian_plum hover:bg-green text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded float-right ml-1"
            onClick={() => {
              puchaseBooks(currentUser);
            }}
            type="submit"
          >
            Check out
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainCart;
