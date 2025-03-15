import React from "react";
import { useSelector } from "react-redux";
import DiaryProductsListItem from "../DiaryProductsListItem/DiaryProductsListItem";

const DiaryProductsList = ({ selectedDate }) => {
  const products = useSelector((state) => state.myProducts.items);

  const filteredProducts = products.filter(
    (product) => product.date === selectedDate.toISOString().split("T")[0]
  );

  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-lg font-semibold mb-2">Eklenen Ürünler</h2>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => (
            <DiaryProductsListItem key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <p>Bu tarihte ürün bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default DiaryProductsList;