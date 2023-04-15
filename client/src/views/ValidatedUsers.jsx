//imports 
import axios from "axios";
import React from "react";
import UserRow from "../components/UserRow";
import { Pagination } from "@mui/material";
import { isAdmin, sendToHome } from "../utils/PermissionUtils";

{/* The validated users page is restricted to authenticated users only such as employees and admin. 
Admin of the website have the ability to delete a user, edit the user's role, and and edit the balance
to purchase books. Once all of that it gets stored into the database and the login is updated with the user's 
new credentials if anything has been changed or updated.*/}

//the ValidatedUsers class extends the built in function of react component which takes a state that has the current user and the array of users as well
export default class ValidatedUsers extends React.Component {
  state = {
    users: [],
    pageSize: 12,
    currentPage: 1
  };

  //async function which ensures to return a promise of getting the validated users
  async getValidatedUsers() {
    const url = "/api/users"; //gets the users from the api
    axios.get(url).then((res) => { //axios call to get the data of the users from the url
      const users = res.data; //users from the data
      this.setState({ currentUser: this.props.currentUser, users: users }); // gets the current users
    });
  }

  //gets the validated users for the component
  componentDidMount() {
    this.getValidatedUsers();
  }

  //async function which ensures to return a promise of deleting a user
  //@params: user 
  async deleteUser(user) {
    const id = user._id; //gets the user id
    const url = "/api/users/" + id; //gets the user api and the id which is stored by appending
    //awaits using the axios call
    //delets the user from the api and then reloads 
    await axios 
      .delete(url) 
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.log("Error: ", error)); //error message if it didn't work correctly
  }

  //async function which ensures to return a promise of editing a user's role i.e. customer, employee, or admin
  //@parms: user, newRole
  async editUser(user, newRole) {
    const id = user._id; //gets the user id
    const url = "/api/users/" + id; //gets the user api and the id which is stored by appending
    //try and catch method for assiging the new role to the user
    try {
      await axios.put(url, { role: newRole });
      window.location.reload();
    } catch (error) {
      console.log("Error: ", error); //yields an error if didn't work
    }
  }

  //async function which ensures to return a promise of editing and assigning user's balance (hardcoded for the sake of testing)
  //@params: user, newBalance
  async editBalance(user, newBalance) {
    const id = user._id; //gets the user id
    const url = "/api/users/" + id; //gets the user api and the id which is stored by appending
    //try and catch method for assiging the balance for purchasing books 
    try {
      await axios.put(url, { balance: newBalance });
      // window.location.reload();
    } catch (error) {
      console.log("Error: ", error); //yields an error if didn't work
    }
  }

  changePage = (e, p) => {
    this.setState((state) => ({
      currentPage: p,
    }));
  };

  //sends the updated info of the user to login
  sendToLogin = () => {
    window.location.href = "/login";
  };

  //shows the name, email, actions, role, and balance of the user which can be changed by restricted users only!
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
