import React from "react";

const UserRow = ({ contact, handleEditClick, handleDelete, handleUserTypeChange }) => {
  const handleChange = (event) => {
    const newUserType = event.target.value;
    handleUserTypeChange(contact, newUserType);
  }
  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td class="px-6 py-4">
        {contact.fullName
          ? contact.fullName
          : contact.firstName + " " + contact.lastName}
      </td>
      <td class="px-6 py-4">{contact.username ? contact.username : contact._id}</td>
      <td class="px-6 py-4">{contact.email}</td>
      <td>
        {/* <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button> */}
        <button class="bg-persian_plum text-white ml-4 py-2 px-4" type="button" onClick={() => handleDelete(contact)}>
          Delete
        </button>
      </td>
      <td>
        <select onChange={handleChange} class="form-select block w-full">
          <option>
            customer
          </option>
          <option>
            admin
          </option>
        </select>
      </td>
    </tr>
  );
};

export default UserRow;
