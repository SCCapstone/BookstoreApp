import axios from "axios";
import React from "react";
import { Pagination } from "@mui/material";
import { isAdmin, sendToHome } from "../utils/PermissionUtils";
import BookRow from "../components/BookRow";

export default class UpdateBooks extends React.Component {
  // state = {
  //   books: [],
  //   pageSize: 12,
  //   currentPage: 1
  // };

  // async getBooks() {
  //   const url = "/api/books";
  //   axios.get(url).then((res) => {
  //     const books = res.data;
  //     this.setState({ books: books });
  //   });
  // }

  // componentDidMount() {
  //   this.getBooks();
  //   console.log(this.state.books)
  // }

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

  // changePage = (e, p) => {
  //   this.setState((state) => ({
  //     currentPage: p,
  //   }));
  // };

  // getPaginatedBooks(currentPage) {
  //   const firstPageIndex = (currentPage-1) * this.state.pageSize;
  //   const lastPageIndex = firstPageIndex + this.state.pageSize;
  //   return this.state.books.slice(firstPageIndex, lastPageIndex);
  // };

  render() {
    return (
<div>
  one
</div>

    )
  }
}
