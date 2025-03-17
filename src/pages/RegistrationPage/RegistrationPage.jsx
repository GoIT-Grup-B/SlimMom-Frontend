import { useSelector } from "react-redux";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const RegistrationPage = () => {
  const { isLoggedIn, error } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [ error, navigate]);

  return (
    <>
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {!isLoggedIn && (
        <p>Loading register</p>
      )}
      <RegistrationForm />
      <Toaster />
    </>
  );
};

export default RegistrationPage;
