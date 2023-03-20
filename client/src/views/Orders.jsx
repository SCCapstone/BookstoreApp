import axios from "axios";
import React, { Fragment } from "react";
import OrdersRow from "../components/OrdersRow";

export default class Orders extends React.Component {
  state = {
    orders: [],
  };

  async getOrders() {
    const url = "/api/orders";
    axios.get(url).then((res) => {
      const orders = res.data;
      console.log(orders);
      this.setState({ orders: orders });
    });
  }

  async editOrder(order, orderStatus) {
    const id = order._id;
    const url = "/api/order/" + id;
    try {
      await axios.put(url, { orderStatus: orderStatus });
      window.location.reload();
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  componentDidMount() {
    this.getOrders();
  }

  sendToLogin = () => {
    window.location.href = "/login";
  };

  render() {
    return (
      <div className="bg-gainsboro">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
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
                <OrdersRow order={order} handleUpdate={this.editOrder} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
