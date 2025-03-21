import RegistirationPage from './components/RegistrationForm/RegistrationForm';
import LoginPage from './components/LoginForm/LoginForm';
import RightSideBar from './components/RightSideBar/RightSideBar';
import CalculatorCalorieForm from './components/CalculatorСalorieForm/CalculatorCalorieForm';
import { Toaster } from 'react-hot-toast';
import Background from './components/Background/Background';
import DiaryPage from './pages/DiaryPage/DiaryPage';
import UserInfo from './components/UserInfo/UserInfo';

const App = () => {
  return (
    <div>
      <UserInfo />
      <Background>
        <RegistirationPage />
        <LoginPage />
        <RightSideBar />
        <DiaryPage />
        <CalculatorCalorieForm />
        <Toaster />
      </Background>
    </div>
  );
};

export default App;
