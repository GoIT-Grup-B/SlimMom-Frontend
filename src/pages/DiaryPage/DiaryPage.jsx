import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import { DiaryProductsList } from '../../components/DiaryProductsList/DiaryProductsList';
import RideSideBar from '../../components/RightSideBar/RightSideBar';

const DiaryPage = () => {
  const [date, setDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  // Fetch products once (instead of inside DiaryProductsList)
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

  // Re-fetch if date or token changes
  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    fetchProducts(date);
  }, [date, token, navigate]);

  return (
    <div className="m-2.5 p-2.5">
      <DiaryAddProductForm date={date} setDate={setDate} />
      <DiaryProductsList date={date} setDate={setDate} />
    </div>
  );
};

export default DiaryPage;
