import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDelete }) => {
  return (
    <tr>
      <td>
        {contact.fullName
          ? contact.fullName
          : contact.firstName + " " + contact.lastName}
      </td>
      <td>{contact.username ? contact.username : contact._id}</td>
      <td>{contact.email}</td>
      <td>
        {/* <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button> */}
        <button type="button" onClick={() => handleDelete(contact)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
