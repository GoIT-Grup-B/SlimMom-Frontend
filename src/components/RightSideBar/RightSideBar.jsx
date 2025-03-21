import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDailyRate,
  fetchDailyCalories,
} from '../../redux/dailySummary/dailySummaryOps';

const RightSideBar = ({ selectedDate }) => {
  const dispatch = useDispatch();

  // Redux state
  const {
    dailyRate,
    notAllowedFoods,
    consumedCalories,
    leftCalories,
    loading,
    error,
  } = useSelector((state) => state.dailySummary);

  // Login olmuş kullanıcıdan token al
  const token = useSelector((state) => state.auth.token);

  // useEffect → tarih değişince kalori verisini çek
  useEffect(() => {
    if (token && selectedDate) {
      dispatch(fetchDailyCalories(selectedDate));
    }
  }, [dispatch, token, selectedDate]);

  // Dummy → Bilgiler calculator'dan gelince fetchDailyRate çağırılacak
  // dispatch(fetchDailyRate(userData)); // Start Losing Weight butonunda çağırılır

  return (
    <aside className="flex flex-col gap-8 w-full md:w-[300px] p-4 bg-gray-50 rounded-lg shadow-md">
      {/* Summary */}
      <div>
        <h3 className="font-verdana font-bold text-sm mb-4 tracking-wider">
          Summary for {selectedDate}
        </h3>
        {loading ? (
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
               <span>n% of normal</span>
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
