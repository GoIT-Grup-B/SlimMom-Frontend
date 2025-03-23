import React, { useState } from 'react';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import { DiaryProductsList } from '../../components/DiaryProductsList/DiaryProductsList';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
const DiaryPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className='m-2.5 p-2.5'>
      <DiaryAddProductForm date={date} setDate={setDate} />
      <DiaryProductsList date={date} setDate={setDate} />
      <RightSideBar selectedDate={date  } />
    </div>
  );
};

export default DiaryPage;
