import React, { useState } from 'react';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import { DiaryProductsList } from '../../components/DiaryProductsList/DiaryProductsList';

const DiaryPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <DiaryAddProductForm date={date} setDate={setDate} />
      <DiaryProductsList date={date} setDate={setDate} />
    </>
  );
};

export default DiaryPage;
