import React, { useState, useEffect } from 'react';
import { DiaryProductsListItem } from '../DiaryProductsListItem/DiaryProductsListItem';
import axios from 'axios';
import "./scrollbar.css"

export const DiaryProductsList = ({ date }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(
        `https://slimmom-backend-s8n8.onrender.com/user/products?date=${date}`,
      );
      if (response.status === 200) {
        setProducts(response.data.products);
        console.log('PRODUCTS:', response);
      }
    }
    getProducts();
  }, [date]);

  function handleDelete(id) {
    setProducts((prev) =>
      prev.filter((product) => product.productId._id !== id),
    );
  }
  return (
    <>
      {
              <ul className="my-scrollbar flex flex-col max-h-[300px] overflow-y-scroll xl:mt-10 xl:max-h-[400px] xl:max-w-fit xl:pr-5">
          {products.map((product) => (
            <DiaryProductsListItem
              key={product._id}
              name={product.productId.title}
              grams={product.productWeight}
              calories={
                (product.productId.calories * product.productWeight) / 100
              }
              id={product.productId._id}
              date={date}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      }
    </>
  );
};
