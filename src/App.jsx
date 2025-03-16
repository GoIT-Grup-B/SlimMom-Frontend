import RegistirationPage from './components/RegistrationForm/RegistrationForm';
import LoginPage from './components/LoginForm/LoginForm';
import RightSideBar from "./components/RightSideBar/RightSideBar.jsx";

const App = () => {
  return (
    <div>
      <RegistirationPage />
      <LoginPage />
      <RightSideBar />
    </div>
  );
};

export default App;