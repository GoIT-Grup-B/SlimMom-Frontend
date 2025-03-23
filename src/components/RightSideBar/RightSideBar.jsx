import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const RightSideBar = ({ selectedDate }) => {
  const token = useSelector((state) => state.auth.token); // Token direkt auth'tan alınıyor

  const [dailyRate, setDailyRate] = useState(0);
  const [notAllowedFoods, setNotAllowedFoods] = useState([]);
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const leftCalories = dailyRate - consumedCalories;

  // Günlük kalori ihtiyacı & yasaklı yiyecekleri çek
  useEffect(() => {
    const fetchDailyInfo = async () => {
      setStatus('loading');
      try {
        const res = await axios.get('/user/my-daily-calory-need', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDailyRate(res.data.data.dailyRate);
        setNotAllowedFoods(res.data.data.notAllowedFoods);
        setStatus('succeeded');
      } catch (err) {
        setStatus('failed');
        setError(err.response?.data?.message || 'Error');
      }
    };

    if (token) {
      fetchDailyInfo();
    }
  }, [token]);

  // Günlük tüketilen kaloriyi çek
  useEffect(() => {
    const fetchDailyCalories = async () => {
      try {
        const res = await axios.get(`/user/my-daily-calories?date=${selectedDate}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setConsumedCalories(res.data.dailyCalories);
      } catch (err) {
        setError(err.response?.data?.message || 'Error');
      }
    };

    if (token && selectedDate) {
      fetchDailyCalories();
    }
  }, [token, selectedDate]);

  return (
    <aside className="flex flex-col gap-8 w-full md:w-[300px] p-4 bg-gray-50 rounded-lg shadow-md">
      {/* Summary */}
      <div>
        <h3 className="font-verdana font-bold text-sm mb-4 tracking-wider">
          Summary for {selectedDate}
        </h3>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="text-[#9B9FAA] font-[Verdana] text-[14px] leading-[14px] tracking-[0.04em] space-y-2">
            <li className="flex justify-between">
              <span>Left</span>
              <span>{leftCalories ?? 0} kcal</span>
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

      {/* Not Recommended Foods */}
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
