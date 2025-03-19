import RegistirationPage from './components/RegistrationForm/RegistrationForm';
import LoginPage from './components/LoginForm/LoginForm';
import RightSideBar from './components/RightSideBar/RightSideBar';
import Background from './components/Background/Background';
//import AppRoutes from './routers/AppRoutes';

const App = () => {
  return (
    <div>
      <Background>
      <RegistirationPage />
      <LoginPage />
      <RightSideBar />
      </Background>

      </div>
  );
};

export default App;
//      <main>
// <AppRoutes/>
// </main>