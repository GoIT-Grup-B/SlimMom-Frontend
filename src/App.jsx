import RegistirationPage from './components/RegistrationForm/RegistrationForm';
import LoginPage from './components/LoginForm/LoginForm';

import CalculatorCalorieForm from './components/CalculatorСalorieForm/CalculatorCalorieForm';
import { Toaster } from 'react-hot-toast';
import Background from './components/Background/Background';
import DiaryPage from './pages/DiaryPage/DiaryPage';
import AppRoutes from './routers/AppRoutes';
import UserInfo from './components/UserInfo/UserInfo';
import Header from './components/Header/Header';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
<<<<<<< HEAD
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
=======
    return (
        <AppRoutes />
    );
>>>>>>> 92df1780845d7bc17c651490a6b2ed2686640714
};

export default App;
//      <main>
//          <AppRoutes/>
//      </main>
