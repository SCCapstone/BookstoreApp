import axios from "axios";
import React from "react";
import { Pagination } from "@mui/material";
import { isAdmin, sendToHome } from "../utils/PermissionUtils";
import BookRow from "../components/BookRow";

export default class UpdateBooks extends React.Component {
  state = {
    books: [],
    pageSize: 12,
    currentPage: 1,
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
    console.log(this.state.books);
  }

  async deleteBook(book) {
    const id = book._id;
    const url = "/api/books/" + id;
    await axios
      .delete(url)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.log("Error: ", error));
  }

  async editBook(book, update) {
    const id = book._id;
    const url = "/api/books/" + id;
    try {
      await axios.put(url, { role: update });
      window.location.reload();
    } catch (error) {
      console.log("Error: ", error);
    }
    this.getBooks();
  }

  async editStock(book, newStock) {
    const id = book._id;
    const url = "/api/books/" + id;
    try {
      await axios.put(url, { stock: newStock });
    } catch (error) {
      console.log("Error: ", error);
    }
    this.getBooks();
  }

  changePage = (e, p) => {
    this.setState((state) => ({
      currentPage: p,
    }));
  };

  getPaginatedBooks(currentPage) {
    const firstPageIndex = (currentPage - 1) * this.state.pageSize;
    const lastPageIndex = firstPageIndex + this.state.pageSize;
    return this.state.books.slice(firstPageIndex, lastPageIndex);
  }

  render() {
    return isAdmin(this.props.userRole) ? (
      <div className="bg-gainsboro">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Title
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Author</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Price</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Sold</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Stock</div>
                </th>

                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Remove Book</div>
                </th>
                {/* <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Price</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Stock</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Sold</div>
                </th>  */}
              </tr>
            </thead>
            <tbody>
              {this.getPaginatedBooks(this.state.currentPage).map((book) => (
                <BookRow
                  book={book}
                  handleDelete={this.deleteBook}
                  handleEditStock={this.editStock}
                />
              ))}
            </tbody>
          </table>
          <Pagination
            count={Math.ceil(this.state.books.length / this.state.pageSize)}
            page={this.state.currentPage}
            onChange={this.changePage}
          />
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
