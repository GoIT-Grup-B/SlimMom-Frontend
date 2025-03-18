import React, { useState } from 'react';

const RightSideBar = () => {
  // Dummy state - DiaryDateCalender yapılınca gerçek veri çekilir.
  const [selectedDate, setSelectedDate] = useState('13.03.2025');

  // Dummy data - SummaryData yapılınca gerçek veri çekilir.
  const summaryData = {
    left: 600,
    consumed: 1400,
    dailyRate: 2000,
    percentage: 70,
  };
// Dummy data - NotRecommendedData yapılınca gerçek veri çekilir.
  const notRecommended = ['Bread', 'Milk', 'Pork meat', 'Eggplant', 'Nuts'];

  return (
    <aside className="flex flex-col gap-8 w-full md:w-[300px] p-4 bg-gray-50 rounded-lg shadow-md">
      {/* Summary Section */}
      <div className="w-full">
        <h3 className="font-verdana font-bold text-sm mb-4">
          Summary for {selectedDate}
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex justify-between">
            <span>Left</span>
            <span>{summaryData.left} kcal</span>
          </li>
          <li className="flex justify-between">
            <span>Consumed</span>
            <span>{summaryData.consumed} kcal</span>
          </li>
          <li className="flex justify-between">
            <span>Daily rate</span>
            <span>{summaryData.dailyRate} kcal</span>
          </li>
          <li className="flex justify-between">
            <span>{summaryData.percentage}% of normal</span>
          </li>
        </ul>
      </div>

      {/* Food Not Recommended Section */}
      <div className="w-full">
        <h3 className="text-md font-bold mb-3">Food not recommended</h3>
        {notRecommended.length > 0 ? (
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {notRecommended.map((item, idx) => (
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
