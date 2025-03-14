import React from "react";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../redux/myProducts/slice";

const DiaryProductsListItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <li className="flex justify-between items-center bg-white p-2 rounded shadow mb-2">
      <span>{product.name} - {product.weight}g</span>
      <button
        onClick={() => dispatch(removeProduct(product.id))}
        className="bg-red-500 text-white p-1 rounded"
      >
        ❌
      </button>
    </li>
  );
};

export default DiaryProductsListItem;