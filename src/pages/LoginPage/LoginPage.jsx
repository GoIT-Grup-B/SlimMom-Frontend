import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const LoginPage = () => {
  const { isLoggedIn, error } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/diary");
    if (error) toast.error(error.message);
  }, [isLoggedIn, error, navigate]);

  return (
    <>
      <LoginForm />
      <Toaster />
    </>
  );
};

export default LoginPage;
