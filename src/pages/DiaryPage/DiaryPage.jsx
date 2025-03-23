import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import { DiaryProductsList } from '../../components/DiaryProductsList/DiaryProductsList';

const DiaryPage = () => {
  const [date, setDate] = useState(new Date());
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="m-2.5 p-2.5">
      <DiaryAddProductForm date={date} setDate={setDate} />
      <DiaryProductsList date={date} />
    </div>
  );
};

export default DiaryPage;
