import React from 'react';
import axios from 'axios';

export const DiaryProductsListItem = ({
  grams,
  name,
  calories,
  id,
  date,
  onDelete,
}) => {
  async function deleteProduct(id, date) {
    await axios.delete(
      `https://slimmom-backend-s8n8.onrender.com/user/products/${id}?date=${date}`,
      onDelete(id),
    );
  }

  return (
    <li className="flex gap-5">
      <p>{name}</p>
      <p>{grams}</p>
      <p>{Math.round(calories)}</p>
      <button onClick={() => deleteProduct(id, date)}>X</button>
    </li>
  );
};
