import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiaryProductsListItem from "../DiaryProductsListItem/DiaryProductsListItem";
import { addDiaryProduct } from "../../redux/diaryProductsListItem/slice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DiaryProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.diaryProductsListItem?.items || []);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [productName, setProductName] = useState("");
  const [productWeight, setProductWeight] = useState("");

  const handleAddProduct = () => {
    if (productName.trim() && productWeight.trim()) {
      dispatch(addDiaryProduct({ name: productName, weight: productWeight, date: selectedDate }));
      setProductName("");
      setProductWeight("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-6">
      {/* Tarih Seçici */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">📅 {selectedDate.toLocaleDateString()}</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border p-2 rounded-lg text-gray-700 shadow-sm"
        />
      </div>

      {/* Ürün Ekleme Formu */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 rounded-lg flex-grow shadow-sm"
        />
        <input
          type="number"
          placeholder="Grams"
          value={productWeight}
          onChange={(e) => setProductWeight(e.target.value)}
          className="border p-2 rounded-lg w-24 shadow-sm"
        />
        <button
          onClick={handleAddProduct}
          className="bg-orange-500 text-white p-3 rounded-full shadow-md hover:bg-orange-600 transition"
        >
          ➕
        </button>
      </div>

      {/* Ürün Listesi */}
      {products.length > 0 ? (
        <ul className="space-y-2">
          {products.map((product, index) => (
            <DiaryProductsListItem key={product?.id || index} product={product} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Bu tarihte ürün bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default DiaryProductsList;
