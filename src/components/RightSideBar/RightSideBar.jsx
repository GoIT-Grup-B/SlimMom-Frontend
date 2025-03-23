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
          ? JSON.parse(JSON.parse(localStorage.getItem('persist:auth')).token)
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
        // Ekranda hata göstermiyoruz, konsola yazıyoruz sadece
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
        setFetchedDate(res.data.date); // API'den dönen tarih
      } catch (err) {
        console.log(
          'Daily Calories Error:',
          err.response?.data?.message || 'Error',
        );
        // hata olsa bile 0 kalori yazdırıyoruz
      }
    };

    if (selectedDate) {
      fetchDailyCalories();
    }
  }, [selectedDate]);

  return (
    <aside className="flex flex-col gap-8 w-full md:w-[300px] p-4 bg-gray-50 rounded-lg shadow-md">
      {/* Summary */}
      <div>
        <h3 className="font-verdana font-bold text-sm mb-4 tracking-wider">
          Summary for{' '}
          {fetchedDate ||
            (selectedDate ? format(selectedDate, 'dd.MM.yyyy') : '')}
        </h3>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          <ul className="text-[#9B9FAA] font-[Verdana] text-[14px] leading-[14px] tracking-[0.04em] space-y-2">
            <li className="flex justify-between">
              <span>Left</span>
              <span>{leftCalories >= 0 ? leftCalories : 0} kcal</span>
            </li>
            <li className="flex justify-between">
              <span>Consumed</span>
              <span>{consumedCalories ?? 0} kcal</span>
            </li>
            <li className="flex justify-between">
              <span>Daily rate</span>
              <span>{dailyRate ?? 0} kcal</span>
            </li>
            <li className="flex justify-between">
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
      <div>
        <h3 className="text-md font-bold mb-3">Food not recommended</h3>
        {notAllowedFoods?.length > 0 ? (
          <ul className="text-[#9B9FAA] font-[Verdana] text-[14px] list-decimal list-inside">
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
