import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const DiaryProductsListItem = () => {
    const [products, setProducts] = useState('');


    async function getProducts() {
      const response = await axios.get(
        `https://slimmom-backend-s8n8.onrender.com/user/products?date=2025-03-18`,
      );
      setProducts(response.data.products);
      console.log('PRODUCTS:', response.data.products);
    }
    // Gerekli fonksiyonlar tanımlandıktan sonra Burası açılacak
//   useEffect(() => {
//     async function getProducts() {
//       const response = await axios.get(
//         `https://slimmom-backend-s8n8.onrender.com/user/products?date=2025-03-18`,
//       );
//       setProducts(response.data.products);
//       console.log('PRODUCTS:', response.data.products);
//     }
//     getProducts();
//   }, [products]);
    return (
      <>
        <button onClick={()=> getProducts()}>PRODUCTLARI GETİR ULAN</button>
        <li>HELLO</li>
      </>
    );
};
