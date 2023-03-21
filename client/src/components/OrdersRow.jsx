import React from "react";

const showOrder = ({ order }) => {
  console.log(order);
  return Object.keys(order).map((key, i) => (
    <p key={i}>
      <span>{key}</span> x<span> {order[key]}</span>
    </p>
  ));
};

const OrdersRow = ({ order, handleUpdate, handleDelete }) => {
  // console.log(order);
  var currentOrder = order.order;
  const handleChange = (e) => {
    const newOrderType = e.target.value;
    order.orderStatus = newOrderType;
    handleUpdate(order, newOrderType);
  };

  // console.log(currentOrder);

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td class="px-6 py-4">{order.firstName + " " + order.lastName}</td>

      <td class="px-6 py-4">{order.email}</td>
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
    </tr>
  );
};

export default OrdersRow;
