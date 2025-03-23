import RegistirationPage from './components/RegistrationForm/RegistrationForm';
import LoginPage from './components/LoginForm/LoginForm';

import CalculatorCalorieForm from './components/CalculatorСalorieForm/CalculatorCalorieForm';
import { Toaster } from 'react-hot-toast';
import Background from './components/Background/Background';
import DiaryPage from './pages/DiaryPage/DiaryPage';
//import AppRoutes from './routers/AppRoutes'
import UserInfo from './components/UserInfo/UserInfo';
import Header from './components/Header/Header';

const App = () => {
  return (
    <div>
      <Header />
      <Background>
        {
          /* <RegistirationPage />*/
          <>
            <LoginPage />

            <DiaryPage />
          </>
        }
        <CalculatorCalorieForm />
        <Toaster />
      </Background>
    </div>
  );
};

export default App;
//      <main>
//          <AppRoutes/>
//      </main>
