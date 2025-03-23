import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import { DiaryProductsList } from '../../components/DiaryProductsList/DiaryProductsList';
import RightSideBar from '../../components/RightSideBar/RightSideBar'; // Düzelttik!

const DiaryPage = () => {
  const [date, setDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  // Fetch products
  const fetchProducts = async (selectedDate) => {
    try {
      const response = await axios.get(
        `https://slimmom-backend-s8n8.onrender.com/user/products?date=${selectedDate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    fetchProducts(date);
  }, [date, token, navigate]);

  return (
    <div className="flex justify-between">
      <div className="m-2.5 p-2.5">
        {/* Pass a callback to re-fetch or locally update products after adding */}
        <DiaryAddProductForm
          date={date}
          setDate={setDate}
          onAddSuccess={() => fetchProducts(date)}
        />
        <DiaryProductsList
          products={products}
          setProducts={setProducts}
          date={date}
        />
      </div>
      <div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default DiaryPage;