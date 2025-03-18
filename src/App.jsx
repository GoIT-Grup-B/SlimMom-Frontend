import RegistirationPage from './components/RegistrationForm/RegistrationForm';
import LoginPage from './components/LoginForm/LoginForm';
import RightSideBar from './components/RightSideBar/RightSideBar';
import DiaryAddProductForm from './components/DiaryAddProductForm/DiaryAddProductForm';
import { DiaryProductsList } from './components/DiaryProductsList/DiaryProductsList';

const App = () => {
  return (
    <div>
      <RegistirationPage />
      <LoginPage />
      <RightSideBar />
      <DiaryAddProductForm />
      <DiaryProductsList />
    </div>
  );
};

export default App;
