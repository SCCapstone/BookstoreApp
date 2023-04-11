import axios from "axios";
import React, { Fragment } from "react";
import UserRow from "../components/UserRow";
import { Pagination } from "@mui/material";

export default class ValidatedUsers extends React.Component {
  state = {
    currentUser: "",
    users: [],
    pageSize: 12,
    currentPage: 1
  };

  async getValidatedUsers() {
    const url = "/api/users";
    axios.get(url).then((res) => {
      const users = res.data;
      this.setState({ currentUser: this.props.currentUser, users: users });
    });
  }

  componentDidMount() {
    this.getValidatedUsers();
  }

  async deleteUser(user) {
    const id = user._id;
    const url = "/api/users/" + id;
    await axios
      .delete(url)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.log("Error: ", error));
  }

  async editUser(user, newRole) {
    const id = user._id;
    const url = "/api/users/" + id;
    try {
      await axios.put(url, { role: newRole });
      window.location.reload();
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async editBalance(user, newBalance) {
    const id = user._id;
    const url = "/api/users/" + id;
    try {
      await axios.put(url, { balance: newBalance });
      // window.location.reload();
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  // functionality for ensuring unauthenticated users cannot view
  isLoggedIn = () => {
    const currentUser = this.props.currentUser;
    return currentUser && currentUser.length !== 0;
  };

  sendToLogin = () => {
    window.location.href = "/login";
  };

  changePage = (e, p) => {
    this.setState((state) => ({
      currentPage: p,
    }));
  };

  getPaginatedUsers(currentPage) {
    const firstPageIndex = (currentPage-1) * this.state.pageSize;
    const lastPageIndex = firstPageIndex + this.state.pageSize;
    return this.state.users.slice(firstPageIndex, lastPageIndex);
  };

  render() {
    return this.isLoggedIn() ? (
      <div className="bg-gainsboro">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                {/* <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">
                    Id

                  </div>
                </th> */}
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
              {this.getPaginatedUsers(this.state.currentPage).map((user) => (
                <UserRow
                  contact={user}
                  handleDelete={this.deleteUser}
                  handleEditClick={this.editUser}
                  handleEditBalance={this.editBalance}
                />
              ))}
            </tbody>
          </table>
          <Pagination
            count={Math.ceil(this.state.users.length / this.state.pageSize)}
            page={this.state.currentPage}
            onChange={this.changePage}
          />
        </div>
      </div>
    ) : (
      (this.sendToLogin(),
      (
        <div>
          <h1>Restricted to authenticated users only!</h1>
        </div>
      ))
    );
  }
}
