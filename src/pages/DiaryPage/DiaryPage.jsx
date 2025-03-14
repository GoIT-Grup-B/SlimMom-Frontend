import React, { useState } from "react";
import DiaryDateCalendar from "../../components/DiaryDateСalendar/DiaryDateСalendar";
import DiaryAddProductForm from "../../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../../components/DiaryProductsList/DiaryProductsList";

const DiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Günlük Takip</h1>
      <DiaryDateCalendar onDateChange={setSelectedDate} />
      <DiaryAddProductForm selectedDate={selectedDate} />
      <DiaryProductsList selectedDate={selectedDate} />
    </div>
  );
};

export default DiaryPage;
