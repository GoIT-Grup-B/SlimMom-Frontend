import RegistirationPage from './components/RegistrationForm/RegistrationForm';
import LoginPage from './components/LoginForm/LoginForm';
import RightSideBar from './components/RightSideBar/RightSideBar';
import DiaryAddProductForm from './components/DiaryAddProductForm/DiaryAddProductForm';

const App = () => {
  return (
    <div>
      <RegistirationPage />
      <LoginPage />
      <RightSideBar />
      <DiaryAddProductForm />
    </div>
  );
};

export default App;
