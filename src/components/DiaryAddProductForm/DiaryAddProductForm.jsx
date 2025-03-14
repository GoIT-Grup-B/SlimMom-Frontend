import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/myProducts/slice";

const DiaryAddProductForm = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [productWeight, setProductWeight] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !productWeight) return;

    dispatch(addProduct({ name: productName, weight: productWeight, date: selectedDate }));
    setProductName("");
    setProductWeight("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <input
        type="text"
        placeholder="Ürün Adı"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Gramaj (g)"
        value={productWeight}
        onChange={(e) => setProductWeight(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Ürünü Ekle
      </button>
    </form>
  );
};

export default DiaryAddProductForm;