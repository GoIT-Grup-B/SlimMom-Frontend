import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const RightSideBar = ({ selectedDate }) => {
  const [dailyRate, setDailyRate] = useState(0);
  const [notAllowedFoods, setNotAllowedFoods] = useState([]);
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [status, setStatus] = useState('idle');
  const [fetchedDate, setFetchedDate] = useState('');

  const leftCalories = dailyRate - consumedCalories;

  // Günlük kalori ihtiyacı ve yasaklı yiyecekleri çek
  useEffect(() => {
    const fetchDailyInfo = async () => {
      setStatus('loading');
      try {
        const token = localStorage.getItem('persist:auth')
          ? JSON.parse(localStorage.getItem('persist:auth').token)
          : null;

        const res = await axios.get(
          'https://slimmom-backend-s8n8.onrender.com/user/my-daily-calory-needs',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setDailyRate(res.data.data.dailyRate);
        setNotAllowedFoods(res.data.data.notAllowedFoods);
        setStatus('succeeded');
      } catch (err) {
        console.log(
          'Daily Info Error:',
          err.response?.data?.message || 'Error',
        );
        setStatus('failed');
      }
    };

    fetchDailyInfo();
  }, []);

  // Günlük tüketilen kalori ve tarihi çek
  useEffect(() => {
    const fetchDailyCalories = async () => {
      try {
        const token = localStorage.getItem('persist:auth')
          ? JSON.parse(JSON.parse(localStorage.getItem('persist:auth')).token)
          : null;

        const formattedDate = selectedDate
          ? format(selectedDate, 'yyyy-MM-dd')
          : '';

        const res = await axios.get(
          `https://slimmom-backend-s8n8.onrender.com/user/my-daily-calories?date=${formattedDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setConsumedCalories(res.data.dailyCalories);
        setFetchedDate(res.data.date);
      } catch (err) {
        console.log(
          'Daily Calories Error:',
          err.response?.data?.message || 'Error',
        );
      }
    };

    if (selectedDate) {
      fetchDailyCalories();
    }
  }, [selectedDate]);

  return (
    <aside
      className="
        relative
        flex flex-col 
        items-center 
        justify-center 
        gap-8
        w-full
        md:w-[600px]
        min-h-screen
        p-6
        bg-gray-50
        rounded-lg
        shadow-md
        md:bg-[url('/Layer-4-yapraklar.png')]
        bg-no-repeat
        md:bg-[position:calc(600px_-_540px)_top]
        md:bg-[length:auto_100%]
      "
    >
      {/* Summary */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <h3 className="font-verdana font-bold text-sm tracking-wider">
          Summary for{' '}
          {fetchedDate ||
            (selectedDate ? format(selectedDate, 'dd.MM.yyyy') : '')}
        </h3>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          <ul className="text-[#9B9FAA] font-[Verdana] text-[14px] leading-[18px] tracking-[0.04em] space-y-4">
            <li className="flex justify-between gap-4">
              <span>Left</span>
              <span>{leftCalories >= 0 ? leftCalories : 0} kcal</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Consumed</span>
              <span>{consumedCalories ?? 0} kcal</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Daily rate</span>
              <span>{dailyRate ?? 0} kcal</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>% of normal</span>
              <span>
                {dailyRate
                  ? `${Math.round((consumedCalories / dailyRate) * 100)}%`
                  : '0%'}
              </span>
            </li>
          </ul>
        )}
      </div>

      {/* Yasaklı yiyecekler */}
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-md font-bold">Food not recommended</h3>
        {notAllowedFoods?.length > 0 ? (
          <ul className="text-[#9B9FAA] font-[Verdana] text-[14px] list-decimal list-inside text-center space-y-2">
            {notAllowedFoods.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No food restrictions</p>
        )}
      </div>
    </aside>
  );
};

export default RightSideBar;
