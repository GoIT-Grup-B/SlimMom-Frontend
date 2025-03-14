import React from "react";
import { useDispatch } from "react-redux";
import { removeDiaryProduct } from "../../redux/diaryProductsListItem/slice";

const DiaryProductsListItem = ({ product }) => {
  const dispatch = useDispatch();

  if (!product) {
    return <li className="bg-gray-200 p-2 rounded-lg shadow text-gray-600">Ürün bilgisi yüklenemedi.</li>;
  }

  return (
    <li className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md border border-gray-300">
      <div className="flex items-center gap-4">
        <span className="text-gray-800 font-medium">{product.name}</span>
        <span className="text-gray-600">{product.weight}g</span>
      </div>
      <span className="text-gray-600">{Math.round(product.weight * 3.2)} kcal</span> 
      <button
        onClick={() => dispatch(removeDiaryProduct(product.id))}
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
      >
        ❌
      </button>
    </li>
  );
};

export default DiaryProductsListItem;
