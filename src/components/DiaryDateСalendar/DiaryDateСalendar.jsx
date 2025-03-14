import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DiaryDateCalendar = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-4">
        <Calendar
          onChange={handleChange}
          value={date}
          className="w-full border-none rounded-md"
        />
      </div>
    </div>
  );
};

export default DiaryDateCalendar;
