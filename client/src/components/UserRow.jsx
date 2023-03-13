import React, { useState } from "react";

const UserRow = ({ contact, handleEditClick, handleDelete }) => {
  // console.log(contact)
  const [balance, setBalance] = useState(contact.balance["$numberDecimal"]);
  console.log(balance);
  const handleChange = (e) => {
    const newUserType = e.target.value;
    handleEditClick(contact, newUserType);
  };
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
      <td>
        <input
          type="number"
          placeholder={balance}
          className="text-black placeholder-black"
          size="25"
        />
        <button
          class="bg-persian_plum text-white ml-4 py-2 px-4"
          type="button"
          onClick={() => handleDelete(contact)}
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
