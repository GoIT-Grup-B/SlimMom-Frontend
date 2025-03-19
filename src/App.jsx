import RegistirationPage from './components/RegistrationForm/RegistrationForm';
import LoginPage from './components/LoginForm/LoginForm';
import RightSideBar from './components/RightSideBar/RightSideBar';
import DiaryAddProductForm from './components/DiaryAddProductForm/DiaryAddProductForm';

import { DiaryProductsList } from './components/DiaryProductsList/DiaryProductsList';
import CalculatorCalorieForm from './components/CalculatorСalorieForm/CalculatorCalorieForm';
import { Toaster } from 'react-hot-toast';
import Background from './components/Background/Background';

const App = () => {
  return (
    <div>
      <Background>
        <RegistirationPage />
        <LoginPage />
        <RightSideBar />
        <DiaryAddProductForm />
        <DiaryProductsList />
        <CalculatorCalorieForm />
        <Toaster />
      </Background>
    </div>
  );
};

export default App;
//      <main>
// <AppRoutes/>
// </main>
