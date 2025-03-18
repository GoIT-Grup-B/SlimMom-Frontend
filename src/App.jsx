import RegistirationPage from './components/RegistrationForm/RegistrationForm';
import LoginPage from './components/LoginForm/LoginForm';
import RightSideBar from './components/RightSideBar/RightSideBar';
import DiaryAddProductForm from './components/DiaryAddProductForm/DiaryAddProductForm';
import CalculatorCalorieForm from './components/CalculatorСalorieForm/CalculatorCalorieForm';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <RegistirationPage />
      <LoginPage />
      <RightSideBar />
      <DiaryAddProductForm />
      <CalculatorCalorieForm />
      <Toaster />
    </div>
  );
};

export default App;
