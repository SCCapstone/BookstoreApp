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
    await axios.delete(url).then(() => {
      window.location.reload();
    }).catch((error) => console.log("Error: ", error));
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
      <div className="app-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Id</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => (
              <Fragment>
                <UserRow contact={user} handleDelete={this.deleteUser} />
              </Fragment>
            ))}
          </tbody>
        </table>
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