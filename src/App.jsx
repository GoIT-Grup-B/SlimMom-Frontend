import RegistirationPage from './components/RegistrationForm/RegistrationForm';
import LoginPage from './components/LoginForm/LoginForm';
import RightSideBar from './components/RightSideBar/RightSideBar';
import Background from './components/Background/Background';

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
