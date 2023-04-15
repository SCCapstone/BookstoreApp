import React, { useState } from "react";

const BookRow = ({
  book,
  handleEditClick,
  handleDelete,
  handleEditStock,
}) => {
  console.log(book)
  const [stock, setStock] = useState(book.stock);
  const updateChange = (e) => {
    setStock(e.target.value);
  };
  const handleChange = (e) => {
    const newUserType = e.target.value;
    handleEditClick(book, newUserType);
  };

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td class="px-6 py-4">
        {book.title}
      </td>
      {/* <td class="px-6 py-4">
        {contact.username ? contact.username : contact._id}
      </td> */}
      <td class="px-6 py-4">{book.author}</td>
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
          onClick={() => handleDelete(book)}
        >
          Delete
        </button>
      </td>

      <td className="">
        <input
          type="stock"
          placeholder={stock}
          value={stock}
          className="text-black placeholder-black text-center w-24"
          onChange={(e) => updateChange(e)}
        />
        <button
          class="bg-persian_plum text-white ml-4 py-2 px-4"
          type="button"
          onClick={() => handleEditStock(book, stock)}
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default BookRow;
