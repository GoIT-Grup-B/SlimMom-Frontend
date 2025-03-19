import React from 'react';
import axios from 'axios';

export const DiaryProductsListItem = ({ grams, name, calories, id, date }) => {
  async function deleteProduct(id, date) {
    await axios.delete(
      `https://slimmom-backend-s8n8.onrender.com/user/products/${id}?date=${date}`,
    );
  }

  return (
    <li className="flex gap-5">
      <p>{name}</p>
      <p>{grams}</p>
      <p>{calories}</p>
      <button onClick={() => deleteProduct(id, date)}>X</button>
    </li>
  );
};
