import CalculatorCalorieForm from '../../components/CalculatorСalorieForm/CalculatorCalorieForm';
import RideSideBar from '../../components/RightSideBar/RightSideBar';
import { useSelector } from 'react-redux';

function CalculatorPage() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="flex justify-between">
      <CalculatorCalorieForm />
      {isLoggedIn && <RideSideBar />}
    </div>
  );
}

export default CalculatorPage;
