import axios from "axios";
import React, { Fragment } from "react";
import swal from "sweetalert2";
import OrdersRow from "../components/OrdersRow";
import { Pagination } from "@mui/material";

export default class Orders extends React.Component {
  state = {
    orders: [],
    pageSize: 12,
    currentPage: 1
  };

  async getOrders() {
    const url = "/api/orders";
    axios.get(url).then((res) => {
      const orders = res.data.reverse();
      this.setState({ orders: orders });
    });
  };

  componentDidMount() {
    this.getOrders();
  };

  async editOrder(order, orderStatus) {
    const id = order._id;
    const url = "/api/orders/" + id;
    try {
      await axios.put(url, order);
      window.location.reload();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  async deleteOrder(order) {
    const id = order._id;
    const url = "/api/orders/" + id;
    try {
      var tmpOrder = { delete: "DELETE" };
      await axios.delete(url, tmpOrder);
      window.location.reload();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  isLoggedIn = () => {
    const currentUser = this.props.currentUser;
    return currentUser && currentUser.length !== 0 ;
  };

  changePage = (e, p) => {
    this.setState((state) => ({
      currentPage: p,
    }));
  };

  getPaginatedOrders(currentPage) {
    const firstPageIndex = (currentPage-1) * this.state.pageSize;
    const lastPageIndex = firstPageIndex + this.state.pageSize;
    return this.state.orders.slice(firstPageIndex, lastPageIndex);
  }

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
              {this.getPaginatedOrders(this.state.currentPage).map((order) => (
                <OrdersRow
                  order={order}
                  handleUpdate={this.editOrder}
                  handleDelete={this.deleteOrder}
                />
              ))}
            </tbody>
          </table>
          <Pagination
            count={Math.ceil(this.state.orders.length / this.state.pageSize)}
            page={this.state.currentPage}
            onChange={this.changePage}
          />
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
  };
}
