import axios from "axios";
import React from "react";
import UserRow from "../components/UserRow";
import { Pagination } from "@mui/material";
import { isAdmin, sendToHome } from "../utils/PermissionUtils";

export default class ValidatedUsers extends React.Component {
  state = {
    users: [],
    pageSize: 12,
    currentPage: 1
  };

  async getValidatedUsers() {
    const url = "/api/users";
    axios.get(url).then((res) => {
      const users = res.data;
      this.setState({ users: users });
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
      (sendToHome(),
      (
        <div>
          <h1>Restricted to administrators only!</h1>
        </div>
      ))
    );
  }
}
