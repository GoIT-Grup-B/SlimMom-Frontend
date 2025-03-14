import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = ({ onDateChange }) => {
    const [selectedDate, setselectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setselectedDate(date);
        if (onDateChange){
            onDateChange(date);
    }
};
  return (
    <div className="flex flex-col items-center gap-2">
        <label className="text-gray-600 font-medium">Tarih Seç:</label>
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-mm-dd"
            className="border p-2 rounded-md w-full"
            />
        </div>
  );
};

export default DateSelector;