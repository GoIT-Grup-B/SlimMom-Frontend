import React from 'react';
import { useSelector } from 'react-redux';

const RightSideBar = () => {
  const summaryData = useSelector(state => state.summary.data);
  const { date, left, consumed, dailyRate, percentOfNormal } = summaryData;
  const notAllowedFoods = useSelector(state => state.dailyRate.notAllowedFoods);

  return (
<aside className="flex flex-col gap-[60px]">
      <div className="w-[288px] h-[166px]">
        <h3 className="font-verdana font-bold leading-[14px] tracking-wider ">Summary for {date}</h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex justify-between">
          <span className="text-sm">Left</span> 
          <span className="text-sm font-medium">{left} kcal</span>
          </li>
          <li className="flex justify-between">
            <span>Consumed</span> <span>{consumed} kcal</span>
          </li>
          <li className="flex justify-between">
            <span>Daily rate</span> <span>{dailyRate} kcal</span>
          </li>
          <li className="flex justify-between">
            <span>n% of normal</span> <span>{percentOfNormal} %</span>
          </li>
        </ul>
      </div>

      {/* Food Not Recommended */}
      <div className="w-[288px] h-[166px]">
        <h3 className="text-lg font-bold mb-2">Food not recommended</h3>
        {notAllowedFoods && notAllowedFoods.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {notAllowedFoods.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500"></p>
        )}
      </div>
    </aside>
  );
};

export default RightSideBar;
