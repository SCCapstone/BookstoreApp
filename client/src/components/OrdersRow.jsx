import React from "react";

const OrdersRow = ({ contact, handleEditClick, handleDelete }) => {
  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td class="px-6 py-4">
        {contact.fullName
          ? contact.fullName
          : contact.firstName + " " + contact.lastName}
      </td>
      {/* <td class="px-6 py-4">
        {contact.username ? contact.username : contact._id}
      </td> */}
      <td class="px-6 py-4">{contact.email}</td>
      <td>
        {/* <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button> */}
        <button
          class="bg-persian_plum text-white ml-4 py-2 px-4"
          type="button"
          onClick={() => handleDelete(contact)}
        >
          Delete
        </button>
      </td>
      <td>
        <select
          value={contact.role}
          onChange={handleChange}
          class="form-select block w-full"
        >
          <option value="customer">customer</option>
          <option value="admin">admin</option>
        </select>
      </td>
      <td className="">
        <input
          type="balance"
          placeholder={balance}
          value={balance}
          className="text-black placeholder-black text-center w-24"
          onChange={(e) => updateChange(e)}
        />
        <button
          class="bg-persian_plum text-white ml-4 py-2 px-4"
          type="button"
          onClick={() => handleEditBalance(contact, balance)}
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default OrdersRow;
