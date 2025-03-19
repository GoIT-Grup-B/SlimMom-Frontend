import React, { useState, useEffect } from 'react';
import { DiaryProductsListItem } from '../DiaryProductsListItem/DiaryProductsListItem';
import axios from 'axios';

export const DiaryProductsList = ({ date }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(
        `https://slimmom-backend-s8n8.onrender.com/user/products?date=${date}`,
      );
      setProducts(response.data.products);
      console.log('PRODUCTS:', response.data.products);
    }
    getProducts();
  }, [date]);
  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <DiaryProductsListItem
              name={product.productId.title}
              grams={product.productWeight}
              calories={
                (product.productId.calories * product.productWeight) / 100
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
};
