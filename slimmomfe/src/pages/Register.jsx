import RegisterForm from "../components/AuthNav/RegistrationForm/RegisterForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Register = () => {
    
  const {isLoggedIn, token} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(isLoggedIn && token){
      navigate('/*',  { replace: true });
    }
  },[isLoggedIn, navigate]);


  return (
    <div>
        <RegisterForm/>
    </div>
  )
}

export default Register;