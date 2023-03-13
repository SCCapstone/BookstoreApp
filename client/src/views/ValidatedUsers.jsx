import axios from "axios";
import React, { Fragment } from "react";
import UserRow from "../components/UserRow";

export default class ValidatedUsers extends React.Component {
  state = {
    currentUser: "",
    users: [],
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
      console.log(newBalance);
      await axios.put(url, { balance: 100 });
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
              {this.state.users.map((user) => (
                <UserRow
                  contact={user}
                  handleDelete={this.deleteUser}
                  handleEditClick={this.editUser}
                  handleEditBalance={this.editBalance}
                />
              ))}
            </tbody>
          </table>
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
