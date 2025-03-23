import CalculatorCalorieForm from '../../components/CalculatorСalorieForm/CalculatorCalorieForm';
import RideSideBar from '../../components/RightSideBar/RightSideBar';

function CalculatorPage() {
  return (
    <div className="flex justify-between">
      <CalculatorCalorieForm />
      <RideSideBar />
    </div>
  );
}

export default CalculatorPage;
