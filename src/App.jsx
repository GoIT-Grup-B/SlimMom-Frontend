import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCurrentUser } from "./redux/auth/authOps";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Eğer token yoksa, fetchCurrentUser çağrısını yapma
    if (!localStorage.getItem("token")) {
      return;
    }
    dispatch(fetchCurrentUser());
  }, [dispatch, location]);

  return (
    <>
      <AppRoutes />
    </>
  );
};

export default App;
