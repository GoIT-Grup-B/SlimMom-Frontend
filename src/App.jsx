import Register from "./components/RegistrationForm/RegisterForm.jsx";
import Login from "./components/LoginForm/LoginForm.jsx";
import DiaryProductsList from "./components/DiaryProductsList/DiaryProductsList.jsx";
import DiaryProductsListItem from "./components/DiaryProductsListItem/DiaryProductsListItem.jsx";
import "./App.css";
function App() {
  return (
    <>
      <div>
        <Register />
        <Login />
        <DiaryProductsList />
        <DiaryProductsListItem />
      </div>
    </>
  );
}

export default App;
