import axios from "axios";
import React from "react";
import { Pagination } from "@mui/material";
import { isAdmin, sendToHome } from "../utils/PermissionUtils";
import BookRow from "../components/BookRow";

export default class Books extends React.Component {
  state = {
    books: [],
    pageSize: 12,
    currentPage: 1
  };

  async getBooks() {
    const url = "/api/books";
    axios.get(url).then((res) => {
      const books = res.data;
      this.setState({ books: books });
    });
  }

  componentDidMount() {
    this.getBooks();
    console.log(this.state.books)
  }

  // async deleteBook(book) {
  //   const id = book._id;
  //   const url = "/api/books/" + id;
  //   await axios
  //     .delete(url)
  //     .then(() => {
  //       window.location.reload();
  //     })
  //     .catch((error) => console.log("Error: ", error));
  // }

  // async editBook(books, update) {
  //   const id = user._id;
  //   const url = "/api/books/" + id;
  //   try {
  //     await axios.put(url, { role: update });
  //     window.location.reload();
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // }

  // async editBalance(user, newBalance) {
  //   const id = user._id;
  //   const url = "/api/books/" + id;
  //   try {
  //     await axios.put(url, { balance: newBalance });
  //     // window.location.reload();
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // }

  changePage = (e, p) => {
    this.setState((state) => ({
      currentPage: p,
    }));
  };

  getPaginatedBooks(currentPage) {
    const firstPageIndex = (currentPage-1) * this.state.pageSize;
    const lastPageIndex = firstPageIndex + this.state.pageSize;
    return this.state.books.slice(firstPageIndex, lastPageIndex);
  };

  render() {
    return isAdmin(this.props.userRole) ? (
      <div className="bg-gainsboro">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Email</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Actions</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Role</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Balance</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {this.getPaginatedUsers(this.state.currentPage).map((user) => (
                <UserRow
                  contact={user}
                  handleDelete={this.deleteUser}
                  handleEditClick={this.editUser}
                  handleEditBalance={this.editBalance}
                />
              ))} */}
            </tbody>
          </table>
          {/* <Pagination
            count={Math.ceil(this.state.books.length / this.state.pageSize)}
            page={this.state.currentPage}
            onChange={this.changePage}
          /> */}
        </div>
      </div>
    ) : (
      (sendToHome(),
      (
        <div>
          <h1>Restricted to administrators only!</h1>
        </div>
      ))
    );
  }
}
