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
    <div className="flex flex-col md:flex-row m-2.5 p-2.5 gap-4">
      {/* Sol kısım: Form + Liste */}
      <div className="flex-1 flex flex-col gap-4">
        <DiaryAddProductForm date={date} setDate={setDate} />
        <DiaryProductsList date={date} setDate={setDate} products={products} />
      </div>

      {/* Sağ kısım: RightSideBar */}
      <div className="w-full md:w-[300px]">
        <RightSideBar selectedDate={date} />
      </div>
    </div>
  );
};

export default DiaryPage;
