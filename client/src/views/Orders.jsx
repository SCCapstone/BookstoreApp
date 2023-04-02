import axios from "axios";
import React, { Fragment } from "react";
import swal from "sweetalert2";
import OrdersRow from "../components/OrdersRow";

export default class Orders extends React.Component {
  state = {
    orders: [],
  };

  async getOrders() {
    const url = "/api/orders";
    axios.get(url).then((res) => {
      const orders = res.data;
      // console.log(orders);
      this.setState({ orders: orders });
    });
  }

  async editOrder(order, orderStatus) {
    const id = order._id;
    const url = "/api/orders/" + id;
    try {
      await axios.put(url, order);
      window.location.reload();
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async deletOrder(order) {
    const id = order._id;
    const url = "/api/orders/" + id;
    try {
      // console.log(orderStatus);
      var tmpOrder = { delete: "DELETE" };
      await axios.delete(url, tmpOrder);
      window.location.reload();
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  componentDidMount() {
    this.getOrders();
  }

  // sendToLogin = () => {
  //   if (this.props.currentUser === "customer") {
  //     swal.fire({
  //       icon: "error",
  //       title: "User cannot access orders",
  //       text: "Please update your permission level",
  //     });
  //     return;
  //   } else {
  //     window.location.href = "/login";
  //   }
  // };
  isLoggedIn = () => {
    const currentUser = this.props.currentUser;
    return currentUser && currentUser.length !== 0 ;
  };


  render() {
    return this.isLoggedIn() ? (
      <div className="bg-gainsboro">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Order Time
                </th>
                <th scope="col" class="px-6 py-3">
                  Customer Name
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Customer Email</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Order</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Price</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Status</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order) => (
                <OrdersRow
                  order={order}
                  handleUpdate={this.editOrder}
                  handleDelete={this.deletOrder}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      // (this.sendToLogin(),
      (
        <div className="pt-10 mt-10">
          <h1>Restricted to authenticated users only!</h1>
          {this.props.currentUser}
        </div>
      )
      // )
    );
  }
}
