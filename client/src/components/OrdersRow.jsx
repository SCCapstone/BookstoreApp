import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersRow = ({ order, ordererId, handleUpdate, handleDelete }) => {
  var currentOrder = order.order;
  const [user, setUser] = useState({});
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      if (ordererId === null) return;
      const url = "/api/users/" + ordererId;
      let res = await axios.get(url);
      res.data.password = "";
      setUser(res.data);
    };

    const getBooks = async () => {
      const url = "/api/books/" + getKeys(currentOrder);
      let res = await axios.get(url);
      setBooks(res.data);
    };
    
    getUser();
    getBooks();
  }, []);

  const getKeys = (obj) => {
    var keys = [];
    iterate(obj, function (oVal, oKey) {
      keys.push(oKey);
    });
    return keys;
  }
  
  const iterate = (iterable, callback) => {
    for (var key in iterable) {
      if (
        key === "length" ||
        key === "prototype" ||
        !Object.prototype.hasOwnProperty.call(iterable, key)
      )
        continue;
      callback(iterable[key], key, iterable);
    }
  }

  const showOrder = ({ order }) => {
    return Object.keys(order).map((key, i) => {
      let title = key;
      try {
        if (books !== null && books !== undefined && books.find(x => x._id === key) !== undefined) {
          title = books.find(x => x._id === key).title;
        }
      } catch { }
      
    
    return (
      <p key={i}>
        <span>{title}</span> x<span> {order[key]}</span>
      </p>
    )});
  };

  const handleChange = (e) => {
    const newOrderType = e.target.value;
    order.orderStatus = newOrderType;
    handleUpdate(order, newOrderType);
  };

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td class="px-6 py-4">{order.orderDate.toLocaleString()}</td>

      <td class="px-6 py-4">{user.firstName + " " + user.lastName}</td>

      <td class="px-6 py-4">{user.email}</td>
      <td class="px-6 py-4">{showOrder(order)}</td>

      <td class="px-6 py-4">${order.orderPrice}</td>
      {/* <td class="px-6 py-4">{order.orderStatus}</td> */}

      <td>
        <select
          value={order.orderStatus}
          onChange={handleChange}
          class="form-select block w-full"
        >
          <option value="In-Progress">In-Progress</option>
          <option value="Fulfilled">Fulfilled</option>
        </select>
      </td>
      <td className="">
        <button
          class="bg-persian_plum text-white ml-4 py-2 px-4"
          type="button"
          onClick={() => handleDelete(order)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default OrdersRow;
