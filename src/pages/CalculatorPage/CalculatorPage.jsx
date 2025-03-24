import CalculatorCalorieForm from '../../components/CalculatorСalorieForm/CalculatorCalorieForm';
import RideSideBar from '../../components/RightSideBar/RightSideBar';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function CalculatorPage() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [dailyRateData, setDailyRateData] = useState(null);

  return (
    <div className="flex justify-between">
      <CalculatorCalorieForm setDailyRateData={setDailyRateData} />
      {isLoggedIn && <RideSideBar dailyRateData={dailyRateData} />}
    </div>
  );
}

export default CalculatorPage;
